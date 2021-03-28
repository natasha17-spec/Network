import React, {ChangeEvent, useState} from 'react';
import {UploadOutlined} from '@ant-design/icons';
import {EditOutlined} from '@ant-design/icons';
import s from './ProfileInfo.module.css';

// @ts-ignore
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/ava.jpg";
// @ts-ignore
import ProfileDataForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from '../../../types/types';
import Preloader from "../../common/preloader/Preloader";
import Avatar from "antd/lib/avatar/avatar";
import {Button, Card, Col} from "antd";
import Input from "antd/lib/input";
import Upload from "antd/lib/upload";

type PropsType = {
    profile: ProfileType | null
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => Promise<any>
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData: ProfileType) => {
        // todo: remove then
        saveProfile(formData).then(
            () => {
                setEditMode(false);
            }
        );
    }

    return (
        <div>
            <div className={s.descriptionBlock}>

                <Col span={9}>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <Avatar shape="square" src={profile.photos.large || userPhoto} size={264}/>

                        <div style={{display: "flex", width: '31%', justifyContent: 'center', margin: '10px'}}>
                            {isOwner &&
                            <Upload>
                                <Button onChange={onMainPhotoSelected} icon={<UploadOutlined/>}>Upload</Button>
                            </Upload>
                            }
                        </div>
                        <Card title="Учи матчасть!" bordered={false} style={{ width: 300 }}>

                            <p>-не повторяй, а пиши сам</p>
                            <p>-копируя код со Stack Overflow - разбери его и пойми, что вообще там происходит </p>
                            <p>-добавляй key в map</p>
                            <p>-смотри иногда в консоль</p>
                            <p>-страдай, пока не будешь знать матчасть</p>
                            <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>
                        </Card>

                    </div>
                </Col>

                <Col span={15}>
                    {editMode
                        ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                        : <ProfileData goToEditMode={() => {
                            setEditMode(true)
                        }} profile={profile} isOwner={isOwner}/>
                    }


                </Col>
            </div>
        </div>
    )
}

type ProfileDataPropsType = {
    profile: ProfileType
    isOwner: boolean
    goToEditMode: () => void
}
const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {
    return <div>
        {isOwner && <div>
            <div style={{margin: '10px'}}><Button type="primary" icon={<EditOutlined />} onClick={goToEditMode}>Edit</Button></div>
        </div>
        }
        <div>
            <div>
                <div>
                    <b>Full name</b>:
                </div>
                <div>
                    <Input placeholder="Basic usage" defaultValue={profile.fullName}/>
                </div>
            </div>

            <div>
                <div>
                    <b>Looking for a job</b>:
                </div>
                <div>
                    <Input placeholder="Basic usage" defaultValue={profile.lookingForAJob ? "yes" : "no"}/>
                </div>
            </div>

            {profile.lookingForAJob &&
            <div>
                <div>
                    <b>My professional skills</b>:
                </div>
                <div>
                    <Input placeholder="Basic usage" defaultValue={profile.lookingForAJobDescription}/>
                </div>
            </div>
            }

            <div>
                <div>
                    <b>About me</b>:
                </div>
                <div>
                    <Input placeholder="Basic usage" defaultValue={profile.aboutMe}/>
                </div>
            </div>
            <div>
                <b>Contacts</b>: {
                Object
                    .keys(profile.contacts)
                    .map((key) => {
                        return <Contact key={key}
                                        contactTitle={key}
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
            <div>
                <b>{contactTitle}</b>:
            </div>
            <div>
                <Input placeholder="---" defaultValue={contactValue}/>
            </div>
        </div>
}

export default ProfileInfo;
