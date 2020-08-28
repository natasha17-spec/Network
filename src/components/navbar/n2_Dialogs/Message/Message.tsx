import React from 'react';
import p from './../Dialogs.module.css'

type PropsType = {
    message:string
}
const Message:React.FC<PropsType>= (props) => {
    return <div className={p.message}>{props.message}</div>
};

export default Message;