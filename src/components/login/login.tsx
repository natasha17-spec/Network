import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../utils/validatos/validators";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {connect, useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import styles from "./../common/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../redux/redux-store";
import {login} from "../../redux/AuthReducer";


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType>> = ({handleSubmit, error}) => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    return (
        <div className={styles.form}>
            <form onSubmit={handleSubmit}>
                {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
                {createField<LoginFormValuesTypeKeys>("Email", "password", [required], Input, {type: "password"})}
                <div>
                    {createField<LoginFormValuesTypeKeys>(undefined, "remember_me", [], Input, {type: "checkbox"}, "remember me")}
                </div>
                <div className={styles.captcha}>
                    {captchaUrl && <img src={captchaUrl}/>}
                    {captchaUrl && createField(
                        "symbols",
                        "captcha",
                        [required],
                        Input)}
                </div>
                {error &&
                <div className={styles.formSummaryContainer}>
                    <div className={styles.formSummaryError}>{error}</div>
                </div>
                }
                <div className={styles.formOnButton}>
                    <button>Login</button>
                </div>
            </form>
        </div>
    )
};
const LoginReduxForm = reduxForm<LoginFormValuesType>({form: 'login'})(LoginForm);




type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string
}

export type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

export const Login: React.FC = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    };

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }
    return <div className={styles.login}>
        <h1>LOGIN</h1>
        <LoginReduxForm  onSubmit={onSubmit}/>
    </div>
};




