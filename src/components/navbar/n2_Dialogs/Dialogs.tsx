import React from 'react';
import p from './Dialogs.module.css'
import DialogItem from "./Dialogitem/Dialogitem";
import Message from "./Message/Message";
import {InitialStateType} from "../../../redux/DialogsReducer";
import AddMessageForm from "./AddMessageForm/AddMessageForm";

type PropsType = {
    dialogsPage:InitialStateType
    sendMessage:(newMessageText:string)=>void
}


export type NewMessageFormValuesType = {
    newMessageBody:  string
}


const Dialogs:React.FC<PropsType> = (props) => {
    let state= props.dialogsPage;
    let dialogsElements = state.dialogsData.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>);
    let messagesElements = state.messagesData.map(message => <Message message={message.message} key={message.id}/>);


    let addNewMessage=(values:NewMessageFormValuesType)=>{
        props.sendMessage(values.newMessageBody);
        values.newMessageBody=""
    };


    // @ts-ignore
    // @ts-ignore
    return (
        <div className={p.dialogs}>
            <div className={p.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={p.messages}>
                <div>{messagesElements}</div>
                // @ts-ignore
                    <AddMessageForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
};

export default Dialogs;