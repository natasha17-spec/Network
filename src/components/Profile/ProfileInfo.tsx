import React, {ChangeEvent, useState} from 'react';
import s from './Profile.module.css';
import photo from "../../assets/ava.jpg"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../types/types";
import Preloader from "../common/Preloader/Preloader";
import {ProfileInfoUser} from "./ProfileInfoUser";

type PropsType = {
    profile: (null | ProfileType)
    status: string
    isOwner: boolean
    updateStatus: (status: string) => void
    saveProfile: (profile: ProfileType) => Promise<any>
    fullName: (null | string)
    aboutMe: (null | string)
    lookingForAJob: (null | boolean)
    lookingForAJobDescription: (null | string)
    savePhoto: (file: File) => void
}
const ProfileInfo: React.FC<PropsType> = ({
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

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) { // если files есть, тогда берем длину
            savePhoto(e.target.files[0]);
        }
    };
    const onSubmit = (formData: ProfileType) => {
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
type ProfileDataPropsType = {
    profile: ProfileType, isOwner: boolean, goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return <div className={s.listAboutUsers}>

        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}

        {/*<div>"Fullname":{profile.fullName}</div>*/}
        {/*<div>"AboutMe":{profile.aboutMe}</div>*/}
        {/*<div>"lookingForAJob":{profile.lookingForAJob ? 'Да' : "Нет"}</div>*/}
        {/*<div>"My skills":{profile.lookingForAJobDescription}</div>*/}

        {ProfileInfoUser("Fullname", profile.fullName)}
        {ProfileInfoUser("AboutMe", profile.aboutMe)}
        {ProfileInfoUser("lookingForAJob", profile.lookingForAJob ? 'Да' : "Нет")}
        {ProfileInfoUser("My skills", profile.lookingForAJobDescription)}

        <div className={s.contactContainer}>
            <b className={s.decoreContacts}>Contact</b>:
            <div className={s.contacts}>
                {
                    Object
                        .keys(profile.contacts)
                        .map(key => {
                            return <Contact key={key} contactTitle={key}
                                            contactValue={profile.contacts[key as keyof ContactsType]}/>
                        })}
            </div>
        </div>
    </div>
}
type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
const Contact: React.FC<ContactsPropsType> = ({contactTitle, contactValue}) => {
    return <div>
        <b>{contactTitle}</b>: {contactValue}
    </div>
}

export default ProfileInfo;