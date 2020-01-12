import React from 'react';
import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {

    return(

        <div>
           <ProfileInfo  profile={props.profile}
                         fullName={props.fullName}
                         aboutMe={props.aboutMe}
                         lookingForAJob={props.lookingForAJob}
                         lookingForAJobDescription={props.lookingForAJobDescription}
           />
            <MyPostsContainer/>
        </div>
    );
};
export default Profile;