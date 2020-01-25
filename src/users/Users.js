import React from 'react';
import userPhoto from "./images.png";
import '../App.css'
import {NavLink, Redirect} from "react-router-dom";


let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    if(!props.isAuth)return <Redirect to={'/login'}/>;
    return <div className='usersContainer'>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p && 'selectedPage'}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}
                >{p}_</span>
            })}
        </div>

        {
            props.users.map(u => <div className='allUsers' key={u.id}>
                    <div className='nickUsers'>
                        <div className='photoUsers'>
                            <NavLink to={'/profile/' + u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} height='50px'
                                     width='50px' className='photo' alt={'photoUser'}/>
                            </NavLink>
                        </div>
                        <div>


                            {u.followed
                                ? <button disabled={props.followingInProgress}
                                          onClick={() => {
                                              props.unfollow(u.id)

                                }} className='buttonUnFollow'>UnFollow</button>


                                : <button disabled={props.followingInProgress} onClick={() => {
                                    props.follow(u.id)
                                }}
                                          className='buttonFollow'>Follow</button>
                            }
                        </div>
                    </div>
                    <div className='statusUsers'>
                        <div className='full_status'>
                            <div className='fullname'>
                                <div>{u.name}</div>
                                <div>{u.status} </div>
                            </div>
                            <div className='country'>
                                <div>{"u.location.country"}</div>
                                <div>{"u.location.city"} </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
    </div>
};


export default Users;