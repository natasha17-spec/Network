import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {

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