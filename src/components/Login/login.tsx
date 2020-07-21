import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../utils/validatos/validators";
import {createField, GetStringKeys, Input} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../Redux/AuthReducer";
import {Redirect} from "react-router-dom";
import styles from "./../common/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../Redux/redux-store";

type LoginFormOwnProps = {
    captchaUrl: string | null
}
const LoginForm:React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit,captchaUrl,error}) => {
    return (
        <div className={styles.form}>
            <form onSubmit={handleSubmit}>
                {createField<LoginFormValuesTypeKeys>("Email","email",[required],Input)}
                {createField<LoginFormValuesTypeKeys>("Email","password",[required],Input,{type: "password"})}
                <div>
                {createField<LoginFormValuesTypeKeys>(undefined,"remember_me",[], Input,{type: "checkbox"},"remember me")}
                </div>
               <div className={styles.captcha}>
                   { captchaUrl && <img src={captchaUrl} />}
                   { captchaUrl && createField(
                       "symbols",
                       "captcha",
                       [required],
                       Input) }
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
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);
type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>

type MapStatePropsType = {
    captchaUrl:string | null
    isAuth: boolean
}
type MapDispatchPropsType = {
    login:(email:string, password: string, rememberMe: boolean, captcha: string)=>void
}

type LoginFormValuesType = {
    email:  string,
    password: string,
    rememberMe: boolean,
    captcha: string
}
const Login:React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {

    const onSubmit = (formData:LoginFormValuesType)=>{
        props.login(formData.email, formData.password, formData.rememberMe,formData.captcha)
    };

    if (props.isAuth){
        return <Redirect to={'/profile'}/>
    }
    return <div className={styles.login}>
        <h1>LOGIN</h1>
        <LoginReduxForm captchaUrl={props.captchaUrl} onSubmit={onSubmit}/>
    </div>
};


const mapStateToProps =(state:AppStateType):MapStatePropsType=>({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, {login})(Login);
