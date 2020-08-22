import React, {useState} from 'react';
import s from './Profile.module.css';
import Preloader from "../common/preloader/Preloader";
import {ProfileInfoUser} from "./ProfileInfoUser";
import photo from "../../Picture/ava.jpg"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import {SetProfileType} from "../../Redux/ProfileReducer";
import {ProfileType} from "../../types/types";

type ProfileInfoPropsType = {
    saveProfile: (profile: SetProfileType) => void
    status: null | string
    updateStatus: (status: string) => void
    profile: (null | ProfileType)
    fullName: (null | string)
    aboutMe: (null | string)
    lookingForAJob: (null | boolean)
    lookingForAJobDescription: (null | string)
    isOwner: number
    savePhoto: (file: any) => void
}
const ProfileInfo: React.FC<ProfileInfoPropsType> = ({
                                                         saveProfile,
                                                         savePhoto,
                                                         profile,
                                                         status,
                                                         updateStatus,
                                                         isOwner,
                                                     }) => {

    let [editMode, setEditMode] = useState<boolean>(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    };
    const onSubmit = (formData) => {
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }

    return (
        <div className={s.usersContainer}>
            <div className={s.data_users}>
                <img src={profile.photos.large || photo} className={s.users_ava}/>

                {isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
            </div>

            {editMode
                ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                : <ProfileData goToEditMode={() => {
                    setEditMode(true)
                }}
                               profile={profile} isOwner={isOwner}/>
            }
        </div>
    );
};

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return <div className={s.listAboutUsers}>

        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}

        {ProfileInfoUser("Fullname", profile.fullName)}
        {ProfileInfoUser("AboutMe", profile.aboutMe)}
        {ProfileInfoUser("lookingForAJob", profile.lookingForAJob ? 'Да' : "Нет")}
        {ProfileInfoUser("My skills", profile.lookingForAJobDescription)}

        <div className={s.contactContainer}>
            <b className={s.decoreContacts}>Contact</b>:
            <div className={s.contacts}>
                {Object.keys(profile.contacts).map(key => {
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
                })}
            </div>
        </div>
    </div>
}
const Contact = ({contactTitle, contactValue}) => {
    return <div>
        <b>{contactTitle}</b>: {contactValue}
    </div>
}

export default ProfileInfo;