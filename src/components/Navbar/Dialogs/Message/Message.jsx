import React from 'react';
import p from './../Dialogs.module.css'



const Message = (props) => {
    return <div className={p.message}>{props.message}</div>
};

export default Message;