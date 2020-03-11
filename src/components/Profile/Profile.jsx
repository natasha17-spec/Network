import React from 'react';
import ProfileInfo from "./ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";

const Profile = (props) => {

    return (

        <div className={s.container}>
            <ProfileInfo
                status={props.status}
                updateStatus={props.updateStatus}
                profile={props.profile}
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