import React from 'react'
import styles from '../FormsControls/FormsControls.module.css'
import {Field} from "redux-form";
import {FileValidatorType} from "../../../utils/validatos/validators";

type FormControlParamsType = {
    meta:{touched:boolean,error:string},
    children:React.ReactNode
}
type FormControlType = (params:FormControlParamsType)=> React.ReactNode

const FormControl:FormControlType = ({meta: {touched,
    error}, children}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>
    )
}
type TextareaPropsType = {
    input
    meta
    child
    restProps

}
export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}

export const createField = (placeholder:null | string, name:string,
                            validators:Array<FileValidatorType>,
                            component: string | React.Component | React.FC,
                            props = {},
                            text = "") => (
    <div>
        <Field placeholder={placeholder} name={name}
               validate={validators}
               component={component}
               {...props}
        /> {text}
    </div>
)