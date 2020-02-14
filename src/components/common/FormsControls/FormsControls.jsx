// import React from "react";
// import styles from "./FormsControls.module.css"
//
//
// export const FormControl = ({input, meta,...props}) => {
//     const hasError = meta.touched && meta.error;
//     return (
//         <div>
//             <div className={ hasError? styles.formControl:""}>
//                 {props.children}
//             </div>
//             {hasError && <span className={styles.error}>{meta.error}</span>}
//         </div>
//     )
// };
//
// export const Textarea = (props) => {
//     debugger
//      const {input,meta, child, ...restProps}= props;
//     return <FormControl {...props}>
//             <textarea {...input}{...restProps}/>
//         </FormControl>
// };
//
//
// export const Input = (props) => {
//     debugger
//    const {input,meta,...restProps}= props;
//     return <FormControl {...props}>
//             <input {...input}{...restProps}/>
//         </FormControl>
//
// };