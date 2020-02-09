import React from 'react';
import s from './Profile.module.css';
import Preloader from "../common/preloader/Preloader";
import ProfileStatus from "./ProfileStatus";


const ProfileInfo = (props) => {
    if(!props.profile){return <Preloader/>}

    return (
        <div>
            <img
                src='https://fartuk.ru/upload/resize_cache/iblock/0e7/960_300_1b89c813fca9325cee2a8ddd42fd21acf/skinali_nyu_york_181600.jpg'/>
            <div className={s.usersContainer}>

                <div className={s.data_users}>
                    <img src={props.profile.photos.large} className={s.users_ava}/>
                <ProfileStatus status={props.status}/>
            </div>
                <div className={s.data}>
                    <div className={s.dataContainer}>
                        <div className={s.name}>Fullname:</div>
                        <div className={s.fullname}>"{props.profile.fullName}"</div>
                    </div>

                    <div className={s.dataContainer}>
                        <div className={s.name}>AboutMe:</div>
                        <div className={s.fullname}> "{props.profile.aboutMe}"</div>
                    </div>

                    <div className={s.dataContainer}>
                        <div className={s.name}>lookingForAJob:</div>
                        <div className={s.fullname}>{props.profile.lookingForAJob ? 'Да' : "Нет" }</div>
                    </div>

                    <div className={s.dataContainer}>
                        <div className={s.name}>lookingForAJobDescription:</div>
                        <div className={s.fullname}>"{props.profile.lookingForAJobDescription}"</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfileInfo;