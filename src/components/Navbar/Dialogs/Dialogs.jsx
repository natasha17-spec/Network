import React from 'react';
import p from './Dialogs.module.css'
import DialogItem from "./Dialogitem/Dialogitem";
import Message from "./Message/Message";
import {sendMessageCreator, updateNewMessageBodyCreator} from "../../../Redux/DialogsReducer";

const Dialogs = (props) => {
    let state= props.store.getState().dialogsPage;
    let dialogsElements = state.dialogsData.map(dialog => <DialogItem name={dialog.name} id={dialog.id}/>);
    let messagesElements = state.messagesData.map(message => <Message message={message.message}/>);
    let newMessageBody = state.newMessageBody;


    let onSendMessageClick=()=>{
        props.store.dispatch(sendMessageCreator());
    };
    let onNewMessageChange=(e)=>{
       let body= e.target.value;
       props.store.dispatch(updateNewMessageBodyCreator(body));
    };

    return (
        <div className={p.dialogs}>
            <div className={p.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={p.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div><textarea value={newMessageBody}
                                   onChange={onNewMessageChange}
                                   placeholder='Enter your message'></textarea></div>
                    <div><button onClick={onSendMessageClick}>Send</button></div>
                </div>
            </div>
        </div>
    )
};
export default Dialogs;