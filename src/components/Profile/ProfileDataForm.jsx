import React from "react";
import s from "./Profile.module.css";
import {ProfileInfoUser} from "./ProfileInfoUser";
import {createField, Input, Textarea} from "../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <div className={s.contactsForm}>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <button>save</button>
                        {error && <div className={s.formSummaryError}>
                            {error}
                        </div>}
                    </div>
                </div>
                <div>
                    {ProfileInfoUser("Fullname",
                        createField("Full name", "fullName", [], Input))}

                    {ProfileInfoUser("AboutMe",
                        createField("AboutMe", "AboutMe", [], Textarea))}

                    {ProfileInfoUser("lookingForAJob",
                        createField("lookingForAJob", "lookingForAJob", [], Input,
                            {type: 'checkbox'}))}

                    {ProfileInfoUser("My skills",
                        createField("My skills", "lookingForAJobDescription", [], Input))}
                </div>
                <div className={s.contactContainer}>
                    <b className={s.decoreContacts}>Contact</b>:
                    <div className={s.contacts}>
                        {Object.keys(profile.contacts).map(key => {
                            return <div>
                                <b>{key}:{createField(key, "contacts."+ key, [], Input)}</b>
                            </div>
                        })}
                    </div>
                </div>
            </form>
        </div>
    )
};
const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm;