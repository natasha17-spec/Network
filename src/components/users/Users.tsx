import React, {useEffect} from 'react';
import User from "./User";
import Paginator from "../common/Paginator/Paginator";
import s from "./Users.module.css"
import {UsersSearchForm} from "./UsersSearchForm";
import {FilterType, requestUsers} from "../../redux/UsersReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getsUsers,
    getTotalUsersCount,
    getUsersFilter
} from "../../redux/users-selector";

type PropsType = {}


export const Users: React.FC<PropsType> = (props) => {

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
    useEffect(()=>{
        dispatch(requestUsers(currentPage,pageSize,filter))
    },[])

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