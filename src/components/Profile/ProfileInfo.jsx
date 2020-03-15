import React from 'react';
import s from './Profile.module.css';
import Preloader from "../common/preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {ProfileInfoUser} from "./ProfileInfoUser";


const ProfileInfo = ({profile,status,updateStatus}) => {
    if (!profile) {
        return <Preloader/>
    }

    return (
            <div className={s.usersContainer}>
                <div className={s.data_users}>
                    <img src={profile.photos.large} className={s.users_ava}/>
                    <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                </div>
                <div className={s.listAboutUsers}>
                    {ProfileInfoUser("Fullname", profile.fullName)}
                    {ProfileInfoUser("AboutMe", profile.aboutMe)}
                    {ProfileInfoUser("lookingForAJob", profile.lookingForAJob ? 'Да' : "Нет")}
                    {ProfileInfoUser("lookingForAJobDescription", profile.lookingForAJobDescription ? 'Да' : "Нет")}
                </div>
            </div>


    );
};
export default ProfileInfo;