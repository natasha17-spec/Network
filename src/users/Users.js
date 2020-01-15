import React from 'react';
import userPhoto from "./images.png";
import '../App.css'
import {NavLink} from "react-router-dom";
import * as axios from "axios";


let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    debugger
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
                                <NavLink to={'/profile/'+ u.id}>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} height='50px'
                                     width='50px' className='photo' alt={'photoUser'}/>
                                </NavLink>
                            </div>
                            <div>


                                {u.followed
                                    ? <button onClick={()=> {
                                        axios.delete (`https:social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                                            {withCredentials: true,
                                                headers:{
                                                    "API-KEY":"aee8e0dc-0edb-41fe-ae30-2037f01a0933"
                                            }})
                                        .then(response => {
                                            if (response.data.resultCode == 0){
                                                props.unfollow(u.id);
                                            }})}}
                                            className='buttonUnFollow'>UnFollow</button>


                                    : <button onClick={() => {
                                            axios.post (`https:social-network.samuraijs.com/api/1.0/follow/${u.id}`,{},
                                                {withCredentials: true,
                                                    headers:{
                                                        "API-KEY":"aee8e0dc-0edb-41fe-ae30-2037f01a0933"
                                                    }})
                                                .then(response => {if (response.data.resultCode == 0){props.follow(u.id)}})}}
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