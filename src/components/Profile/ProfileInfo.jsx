import React from 'react';
import s from './Profile.module.css';
import Preloader from "../common/preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import {ProfileInfoUser} from "./ProfileInfoUser";
import photo from "../../Picture/ava.jpg"


const ProfileInfo = ({profile,status,updateStatus, isOwner, savePhoto}) => {
    if (!profile) {
        return <Preloader/>
    }
    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };
    return (
            <div className={s.usersContainer}>
                <div className={s.data_users}>
                    <img src={profile.photos.large||photo} className={s.users_ava}/>
                    {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
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