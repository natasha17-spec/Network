import React from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo";

const Profile = (props) => {



    return(
        <div>
           <ProfileInfo/>
            <MyPosts posts={props.profilePage.posts}
                     dispatch={props.dispatch}
                     // updateNewPostText={props.updateNewPostText}
                     newPostText={props.profilePage.newPostText}
            />
        </div>
    );
};
export default Profile;