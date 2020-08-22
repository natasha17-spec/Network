import React from 'react';
import Header from "./Header";
// @ts-ignore
import {connect} from "react-redux";
import {logout, setAuthUserData} from "../../redux/AuthReducer";
import {AppStateType} from "../../redux/redux-store";


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

export default connect<MapStateToPropsType,MapDispatchToPropsType,null,AppStateType> (mapStateToProps, {setAuthUserData,logout}) (HeaderContainer);