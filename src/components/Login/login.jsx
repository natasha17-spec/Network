import React from 'react';
import {Field, reduxForm} from "redux-form";

const LoginForm = (props)=>{
        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={"input"} name={"login"} type="text" placeholder={"Login"} />
                </div>
                <div>
                    <Field  component={"input"} type="text" name={"password"} placeholder={"Password"}/>
                </div>
                <div>
                    <Field component={"input"} name={"remember_me"} type="checkbox" /> remember me
                </div>
                <div>
                    <button>Login</button>
                </div>
            </form>
        )
    };
const LoginReduxForm = reduxForm({form: 'Login'})(LoginForm)
const Login = (props) => {
    const onSubmit = (formData)=>{
        console.log(formData)
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};
export default Login;
