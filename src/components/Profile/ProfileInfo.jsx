import React from 'react';
import s from './Profile.module.css'


const ProfileInfo = () => {

    return(
        <div>
            <img src='https://fartuk.ru/upload/resize_cache/iblock/0e7/960_300_1b89c813fca9325cee2a8ddd42fd21acf/skinali_nyu_york_181600.jpg'/>
            <div className={s.ava}>
                ava+decription
            </div>

        </div>
    );
}
export default ProfileInfo;