import React from 'react';
import {reduxForm} from "redux-form";
import {required} from "../../utils/validatos/validators";
import {createField, Input} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../Redux/AuthReducer";
import {Redirect} from "react-router-dom";
import styles from "./../common/FormsControls/FormsControls.module.css"

const LoginForm = (props)=>{
        return (
            <form onSubmit={props.handleSubmit}>

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
                        {type:"password"})}
                   <div >
                       {createField(
                           null,
                           "remember_me",
                           null,Input,
                           {type:"checkbox"},
                           "remember me")}
                   </div>


                {props.error &&
                    <div className={styles.formSummaryContainer}>
                        <div className={styles.formSummaryError}>{props.error}</div>
                    </div>
                }
                <div className={styles.formOnButton}>
                    <button>Login</button>
                </div>
            </form>
        )
    };
const LoginReduxForm =  reduxForm({form: 'login'})(LoginForm);
const Login = (props) => {

    const onSubmit = (formData)=>{
        props.login(formData.email, formData.password, formData.rememberMe)
    };

    if (props.isAuth){
        return <Redirect to={'/profile'}/>
    }
    return <div className={styles.login}>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};
const mapStateToProps =(state)=>({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login} )(Login);
