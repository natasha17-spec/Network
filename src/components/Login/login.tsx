import React from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {required} from "../../utils/validatos/validators";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../Redux/AuthReducer";
import {Redirect} from "react-router-dom";
import styles from "./../common/FormsControls/FormsControls.module.css"
import {AppStateType} from "../../Redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean,
    captchaUrl:null | string,
}


type LoginPropsType = {
    login:(email: null | string, password: any, rememberMe: boolean, captcha: null | boolean)=>void
    formData:{}
    error:string
    handleSubmit:any
 }
 type LoginFormType = {
     error:string
     handleSubmit:any
 }

type PropsType = MapStateToPropsType & LoginPropsType

const LoginForm:React.FC<PropsType & InjectedFormProps<{}, PropsType>> = ({handleSubmit,captchaUrl,error}) => {

    return (

        <div className={styles.form}>
            <form onSubmit={handleSubmit}>

                {createField("Email","email",[required],Input)}
                {createField("Email","password",[required],Input,{type: "password"})}
                <div>
                {createField(null,"remember_me",null, Input,{type: "checkbox"},"remember me")}
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
const LoginReduxForm =  reduxForm({form: 'login'})(LoginForm);




const Login:React.FC<any> = (props) => {

    const onSubmit = (formData:any)=>{
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


const mapStateToProps =(state:AppStateType):MapStateToPropsType=>({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
});

export default connect<MapStateToPropsType,null,PropsType,AppStateType>(mapStateToProps, {login} )(Login);
