import {sendMessageCreator, updateNewMessageBodyCreator} from "../../../Redux/DialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";

let mapStateToProps = (state)=>{
    return {
        dialogsPage: state.dialogsPage
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
let AuthRedirectComponent = withAuthRedirect(Dialogs);


const DialogsContainer = connect( mapStateToProps,mapDispatchToProps)(AuthRedirectComponent);
export default DialogsContainer;