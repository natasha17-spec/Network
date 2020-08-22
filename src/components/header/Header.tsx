import React from 'react';
import s from './Header.module.css';
// @ts-ignore
import {NavLink} from "react-router-dom";


type OwnPropsType = {
    isAuth:boolean,
    login:string|null,
    logout:()=>void,
    setAuthUserData:(id: null | number, email: null | string, login: null | string, isAuth: boolean)=>void
}


const Header:React.FC<OwnPropsType> = (props) => {

    return <header className={s.header}>
            <div> </div>
        <div className={s.loginBlock}>
            {props.isAuth
                ?<div className={s.login}> {props.login} - <button onClick={props.logout}
                                               className={s.logOut}>Log out
                </button></div>
                : <NavLink to={'/login'}>Login</NavLink>}
        </div>
        </header>
};
export default Header;