import React from 'react';
import {reduxForm} from "redux-form";
import {required} from "../../utils/validatos/validators";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../Redux/AuthReducer";
import {Redirect} from "react-router-dom";
import styles from "./../common/FormsControls/FormsControls.module.css"

const LoginForm = ({handleSubmit,captchaUrl,error}) => {
    return (
        <div className={styles.form}>
            <form onSubmit={handleSubmit}>

                {createField(
                    "Email",
                    "email",
                    [required],
                    Input)}
                {createField(
                    "Email",
                    "password",
                    [required],
                    Input,
                    {type: "password"})}
                <div>
                    {createField(
                        null,
                        "remember_me",
                        null, Input,
                        {type: "checkbox"},
                        "remember me")}

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
const Login = (props) => {

    const onSubmit = (formData)=>{
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


const mapStateToProps =(state)=>({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, {login} )(Login);
