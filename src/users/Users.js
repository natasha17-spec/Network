import React from 'react';
import  '../App.css'
import * as axios from 'axios';
import userPhoto from '../users/images.png'


class Users extends React.Component {
 constructor(props) {
    super(props);

         axios.get("https:social-network.samuraijs.com/api/1.0/users/").then(response => {
             this.props.setUsers(response.data.items)
          }); }


    render  ()  {
        return <div className='usersContainer'>
            {
                this.props.users.map(u => <div className='allUsers' key={u.id}>
                        <div className='nickUsers'>
                            <div className='photoUsers'>
                                <img src={u.photos.small != null ? u.photos.small : userPhoto} height='50px'
                                     width='50px' className='photo' alt={'photoUser'}/>
                            </div>
                            <div>
                                {u.followed
                                        ? <button onClick={() => {
                                            this.props.unfollow(u.id)
                                        }} className='buttonFollow'>UnFollow</button>
                                        : <button onClick={() => {
                                            this.props.follow(u.id)
                                        }} className='buttonFollow'>Follow</button>
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
    }
}

export default Users;

