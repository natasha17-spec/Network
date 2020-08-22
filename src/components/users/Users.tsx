import React from 'react';
import User from "./User";
import Paginator from "../common/Paginator/Paginator";
import s from "./Users.module.css"
import {UserType} from "../../types/types";

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
    users: Array<UserType>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
    followingInProgress: Array<number>,
}


let Users: React.FC<PropsType> = ({
                                      currentPage,
                                      totalUsersCount,
                                      pageSize,
                                      onPageChanged,
                                      users,
                                      ...props
                                  }) => {
    return <div className={s.container}>
        <Paginator currentPage={currentPage} onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount} pageSize={pageSize}/>

        <div>
            {
                users.map(u => <User user={u}
                                     followingInProgress={props.followingInProgress}
                                     key={u.id}
                                     unfollow={props.unfollow}
                                     follow={props.follow}
                    />
                )
            }
        </div>
    </div>
}
export default Users;