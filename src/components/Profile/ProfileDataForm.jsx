import React from "react";
import s from "./Profile.module.css";
import {ProfileInfoUser} from "./ProfileInfoUser";
import {createField, Input, Textarea} from "../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";

const ProfileDataForm=({handleSubmit})=>{
    return  (
        <div  className={s.contactsForm}>
            <form onSubmit={handleSubmit}>
            <div>
                <div><button>save</button></div>
            </div>
            <div>
                {ProfileInfoUser("Fullname", createField("Full name", "fullName", [], Input))}
                {ProfileInfoUser("AboutMe", createField("AboutMe", "AboutMe", [], Textarea))}
                {ProfileInfoUser("lookingForAJob", createField("lookingForAJob", "lookingForAJob", [], Input,{type:'checkbox'}))}
                {ProfileInfoUser("My skills", createField("My skills", "lookingForAJobDescription", [], Input))}

            </div>
        </form>
        </div>
        )
};
const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;