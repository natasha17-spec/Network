import React from 'react';
import p from './Dialogs.module.css'
import DialogItem from "./Dialogitem/Dialogitem";
import Message from "./Message/Message";
import {Redirect} from "react-router-dom";
import {Field, reduxForm} from "redux-form";


const Dialogs = (props) => {
    let state= props.dialogsPage;
    let dialogsElements = state.dialogsData.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}/>);
    let messagesElements = state.messagesData.map(message => <Message message={message.message} key={message.id}/>);


    let addNewMessage=(a)=>{
        props.sendMessage(a.newMessageBody);
    };
if(!props.isAuth)return <Redirect to={'/login'}/>;
    return (
        <div className={p.dialogs}>
            <div className={p.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={p.messages}>
                <div>{messagesElements}</div>
                    <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
};
const AddMessageForm = (props)=>{
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component="textarea" name="newMessageBody" placeholder="Enter your message"/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
};
const AddMessageFormRedux = reduxForm({form:"AddMessageForm"})(AddMessageForm);
export default Dialogs;