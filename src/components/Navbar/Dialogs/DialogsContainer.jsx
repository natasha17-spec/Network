import {sendMessageCreator, updateNewMessageBodyCreator} from "../../../Redux/DialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import React from "react";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state)=>{
    return {
        dialogsPage: state.dialogsPage
    }
};
let mapDispatchToProps = (dispatch) => {
    return{
        sendMessage: (newMessageBody)=>{
            dispatch(sendMessageCreator(newMessageBody));
        },
        updateNewMessageBody: (body)=>{
            dispatch(updateNewMessageBodyCreator(body));
        }
    }
};


export default compose(connect
(mapStateToProps,mapDispatchToProps),withAuthRedirect)(Dialogs)

