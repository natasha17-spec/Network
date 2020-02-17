import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {

    return <header className={s.header}>
            <img src='https://cdn1.truelancer.com/upload-full/179574-Logo-01.png'/>
        <div className={s.loginBlock}>
            {props.isAuth
                ?<div> {props.login} - <button onClick={props.logout}
                                               className={s.logOut}>Log out
                </button></div>
                : <NavLink to={'/login'}>Login</NavLink>}

        </div>

        </header>

};
export default Header;