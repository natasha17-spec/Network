import React from 'react';
import '../App.css'
import Paginator from "../components/common/Paginator/Paginator";
import User from "./User";


let Users = ({currentPage, onPageChanged, totalUsersCount, pageSize, users, ...props}) => {

    return <div>
        <Paginator
            currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
        />
        <div>
            {
                users.map(u => <User    user={u}
                                        unfollow={props.unfollow}
                                        key={u.id}
                                        followingInProgress={props.followingInProgress}
                                        follow={props.follow}
                    />
                )
            }

        </div>
    </div>
};


export default Users;