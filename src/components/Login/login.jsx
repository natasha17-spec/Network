import React from 'react';
import {Field, reduxForm} from "redux-form";
import {required} from "../../utils/validatos/validators";
import {Input} from "../common/FormsControl2/FormsControl2";
// import {Input} from "../common/FormsControls/FormsControls";

const LoginForm = (props)=>{
        return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field component={Input}
                           name={"login"}
                           placeholder={"Login"}
                            validate={[required]}
                    />
                </div>
                <div>
                    <Field  component={Input}
                            name={"password"}
                            placeholder={"Password"}
                            validate={[required]}
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
        console.log(formData)
    }
    return <div>
        <h1>LOGIN</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
};
export default Login;
