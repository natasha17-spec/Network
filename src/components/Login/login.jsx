import React from 'react';
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validatos/validators";
import {Input} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {login} from "../../Redux/AuthReducer";
import {Redirect} from "react-router-dom";

const LoginForm = (props)=>{
        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Input}
                           name={"email"}
                           placeholder={"Login"}
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
                <div>
                    <button>Login</button>
                </div>
            </form>
        )
    };
const LoginReduxForm = reduxForm({form: 'Login'})(LoginForm);
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
const mapDispatchToProps =(state)=>({
    isAuth: state.auth.isAuth
});

export default connect (mapDispatchToProps, {login}) (Login);
