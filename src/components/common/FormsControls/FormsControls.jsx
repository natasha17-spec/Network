import React from 'react'
import styles from '../FormsControls/FormsControls.module.css'
import {Field} from "redux-form";

const  FormControl = ({input, meta:{touched,error},children}) => {
    let hasError =  touched && error;
    return (
        <div className={styles.formControl + ' ' +
        (hasError ? styles.error : '')}>
            <p>
                {children}
            </p>
            <p>
                { hasError && <span>{error}</span> }
            </p>
        </div>
    )
}
export const Textarea = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}>
        <textarea  {...input} {...restProps} />
    </FormControl>
};
export const Input = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}>
        <input  {...input} {...restProps} />
    </FormControl>
};


export const createField = (placeholder,name,validators, conponent,props={}, text="")=>(
    <div><Field component={conponent}
              name={name}
              placeholder={placeholder}
              validate={validators}
                {...props}

    />{text}</div>
)