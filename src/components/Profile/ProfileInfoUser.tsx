import React from 'react';
import s from './Profile.module.css';

type ProfilePropsType = {
    text:''
    dataUser
}
export const ProfileInfoUser:React.FC<ProfilePropsType> = ({text = "", dataUser}) => {

    return (
        <div className={s.user}>
            <div className={s.name}>{text}:</div>
            <div className={s.fullname}>{dataUser}</div>
        </div>
    );
};
