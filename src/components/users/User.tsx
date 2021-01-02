import React from 'react';
import "../../App.css"
import userPhoto from "../../assets/images.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";


type PropsType = {
    user:UserType,
    followingInProgress:Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}


let User:React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {


    return (
        <div className="allUsers">
            <div className='nickUsers'>
                <div className='photoUsers'>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userPhoto} height='50px'
                             width='50px' className='photo' alt={'photoUser'}/>
                    </NavLink>
                </div>
                <div>
                    {user.followed
                        ? <button disabled={followingInProgress
                            .some(id => id === user.id)}
                                  onClick={() => {
                                      unfollow(user.id)
                                  }}>
                            Unfollow</button>
                        : <button disabled={followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      follow(user.id)
                                  }}>
                            Follow</button>}

                </div>
            </div>
            <div className='statusUsers'>
                <div className='full_status'>
                    <div className='fullname'>
                        <div>{user.name}</div>
                        <div>{user.status} </div>
                    </div>
                    <div className='country'>
                        <div>{"user.location.country"}</div>
                        <div>{"user.location.city"} </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default User;