import React, {useEffect} from 'react';
import User from "./User";
import Paginator from "../common/Paginator/Paginator";
import s from "./Users.module.css"
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, requestUsers} from "../../redux/UsersReducer";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from 'react-router-dom'
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getsUsers,
    getTotalUsersCount,
    getUsersFilter
} from "../../redux/users-selector";
import * as queryString from "querystring";


export const Users: React.FC = () => {

    const currentPage = useSelector(getCurrentPage)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const filter = useSelector(getUsersFilter)
    const users = useSelector(getsUsers)
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useDispatch()

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter));
    }
    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(currentPage, pageSize, filter))
    }
    const follow = (userId: number) => {
        dispatch(follow(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }
    const history = useHistory()




    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1))

        let actualPage = currentPage
        let actualFilter = filter

        if (!!parsed.page) actualPage = Number(parsed.page)


        if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

        switch(parsed.friend) {
            case "null":
                actualFilter = {...actualFilter, friend: null}
                break;
            case "true":
                actualFilter = {...actualFilter, friend: true}
                break;
            case "false":
                actualFilter = {...actualFilter, friend: false}
                break;
        }

        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [])

    useEffect(()=>{
        history.push({
            pathname:'/users',
            search:`?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
        })
    },[filter,currentPage])

    return <div className={s.container}>
        <UsersSearchForm onFilterChanged={onFilterChanged}/>
        <Paginator currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount}
                   pageSize={pageSize}/>

        <div>
            {
                users.map(u => <User user={u}
                                     followingInProgress={followingInProgress}
                                     key={u.id}
                                     unfollow={unfollow}
                                     follow={follow}
                    />
                )
            }
        </div>
    </div>
}

export default Users;