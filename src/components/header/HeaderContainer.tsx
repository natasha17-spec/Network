import React from 'react';
import Header from "./Header";
// @ts-ignore
import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {actions, logout} from "../../redux/AuthReducer";


type MapStateToPropsType = {
    isAuth:boolean,
    login: string|null
}
type MapDispatchToPropsType = {
    logout:()=>void,
    setAuthUserData:(id: null | number, email: null | string, login: null | string, isAuth: boolean)=>void
}
type PropsType =  MapStateToPropsType & MapDispatchToPropsType

class HeaderContainer extends React.Component<PropsType> {
    render() {
        return <Header {...this.props}/>
    }
}
    const mapStateToProps = (state:AppStateType):MapStateToPropsType => ({
    isAuth:state.auth.isAuth,
    login: state.auth.login
    });

export default connect (mapStateToProps, {setAuthUserData:actions.setAuthUserData,logout}) (HeaderContainer);