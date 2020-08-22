import {sendMessageCreator} from "../../../redux/DialogsReducer";
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
        }
}};


export default compose(connect
(mapStateToProps,mapDispatchToProps),withAuthRedirect)(Dialogs)

