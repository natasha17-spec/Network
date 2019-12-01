import React from 'react';
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
debugger;

    return(
        <div>
           <ProfileInfo/>
            <MyPostsContainer store={props.store}
            />
        </div>
    );
};
export default Profile;