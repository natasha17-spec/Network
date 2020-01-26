import {sendMessageCreator, updateNewMessageBodyCreator} from "../../../Redux/DialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import React from "react";

let mapStateToProps = (state)=>{
    return {
        dialogsPage: state.dialogsPage,
        isAuth:state.auth.isAuth
    }
};
let mapDispatchToProps = (dispatch) => {
    return{
        sendMessage: ()=>{
            dispatch(sendMessageCreator());
        },
        updateNewMessageBody: (body)=>{
            dispatch(updateNewMessageBodyCreator(body));
        }
    }
};
let AuthRedirectComponent = (props)=>{
    if(!this.props.isAuth)return <Redirect to={'/login'}/>;
    return <Dialogs{...props}/>
};

const DialogsContainer = connect( mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);
export default DialogsContainer;