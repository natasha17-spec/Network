import React from 'react';
import p from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {
    id:number
    name:string
}
const DialogItem:React.FC<PropsType> = (props) => {
    let path = "/dialogs/" + props.id;
    return <div className={p.dialog + ' ' + p.active}>
        <NavLink to={path}>{props.name}</NavLink>
    </div>
};

export default DialogItem;