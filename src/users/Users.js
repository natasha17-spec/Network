import React from 'react';
import  '../App.css'

let Users = (props) => {
if (props.users.length===0){
    props.setUsers(
        [
            {
                id: 1,
                photoUrl: 'https://st.depositphotos.com/1898481/3917/i/950/depositphotos_39179105-stock-photo-silhouette.jpg',
                followed: false,
                fullname: 'Natali Gerasimovich',
                status: 'I am a boss',
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 2,
                photoUrl: 'https://st.depositphotos.com/1898481/3917/i/950/depositphotos_39179105-stock-photo-silhouette.jpg',
                followed: true,
                fullname: 'Ivan Petrov',
                status: 'I am a doctor',
                location: {city: 'Moskov', country: 'Russia'}
            },
            {
                id: 3,
                photoUrl: 'https://st.depositphotos.com/1898481/3917/i/950/depositphotos_39179105-stock-photo-silhouette.jpg',
                followed: true,
                fullname: 'Dmitiy Sidorov',
                status: 'I am a devoloper',
                location: {city: 'Minsk', country: 'Belarus'}
            },
            {
                id: 4,
                photoUrl: 'https://st.depositphotos.com/1898481/3917/i/950/depositphotos_39179105-stock-photo-silhouette.jpg',
                followed: false,
                fullname: 'Katya Marinka',
                status: 'I am a teacher',
                location: {city: 'Minsk', country: 'Belarus'}
            }
        ]
    )
}
    return <div className='usersContainer'>
        {
            props.users.map(u => <div className='allUsers' key={u.id}>

                    <div className='nickUsers'>
                        <div className='photoUsers'>
                            <img src={u.photoUrl} height='50px' width='50px' className='photo'/>
                        </div>
                        <div>

                            {u.followed
                                ? <button onClick={() => {
                                    props.unfollow(u.id)
                                }} className='buttonFollow'>UnFollow</button>
                                : <button onClick={() => {
                                    props.follow(u.id)
                                }} className='buttonFollow'>Follow</button>}
                        </div>
                    </div>
                    <div className='statusUsers'>
                        <div className='full_status'>
                            <div className='fullname'>
                                <div>{u.fullname}</div>
                                <div>{u.status} </div>
                            </div>
                            <div className='country'>
                                <div>{u.location.country}</div>
                                <div>{u.location.city} </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

    </div>


};



export default Users;