import React from 'react';
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validatos/validators";
import {Input} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../Redux/AuthReducer";
import {Redirect} from "react-router-dom";
import styles from "./../common/FormsControls/FormsControls.module.css"

const LoginForm = (props)=>{
        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Input}
                           name={"email"}
                           placeholder={"Email"}
                            validate={[required]}
                    />
                </div>
                <div>
                    <Field  component={Input}
                            name={"password"}
                            placeholder={"Password"}
                            validate={[required]}
                            type='password'
                    />
                </div>
                <div>
                    <Field component="input" name={"remember_me"} type="checkbox" /> remember me
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
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};
const mapStateToProps =(state)=>({
    isAuth: state.auth.isAuth
});

export default connect(mapStateToProps, {login} )(Login);
