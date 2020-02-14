import React from 'react'
import styles from '../FormsControls/FormsControls.module.css'

const  FormControl = ({input, meta, ...props}) => {
    let {touched, error} = meta;
    let hasError =  touched && error;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <p>
                {props.children}
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
