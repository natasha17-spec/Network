import React from 'react';
import Header from "./Header";
// @ts-ignore
import {connect} from "react-redux";
import {logout, setAuthUserData} from "../../Redux/AuthReducer";
import {AppStateType} from "../../Redux/redux-store";


type MapStateToPropsType = {
    isAuth:boolean,
    login: boolean
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
    const mapStateToProps = (state:AppStateType) => ({
    isAuth:state.auth.isAuth,
    login: state.auth.login
    });

export default connect (mapStateToProps, {setAuthUserData,logout}) (HeaderContainer);