import React from 'react';
import s from './SideBars.module.css'
// import SideBars from "./SideBars";

const SideBar = (props) => {


    return (

        <div>
            <div className={s.friends}>
                    <img
                        src='http://s1.iconbird.com/ico/0612/vistabasesoftwareicons/w24h241339252498CircleBlue6.png'/>
                    <span>{props.title}</span>
                </div>
        </div>

    );
};
export default SideBar;

