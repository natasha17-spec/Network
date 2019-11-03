import React from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo";

const Profile = (props) => {


    return(
        <div>
           <ProfileInfo/>
            <MyPosts posts={props.state.posts}
                     addPost={props.addPost}
                     apdateNewPostText={props.apdateNewPostText}
            />
        </div>
    );
};
export default Profile;