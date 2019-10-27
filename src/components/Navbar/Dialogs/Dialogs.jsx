import React from 'react';
import p from './Dialogs.module.css'
import DialogItem from "./Dialogitem/Dialogitem";
import Message from "./Message/Message";

const Dialogs = (props) => {

    let dialogsElements = props.state.dialogsData
        .map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);

    let messagesElements = props.state.messagesData.map(message => <Message message={message.message}/>)
    return (
        <div className={p.dialogs}>
            <div className={p.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={p.messages}>
                {messagesElements}
            </div>
        </div>
    )
};
export default Dialogs;