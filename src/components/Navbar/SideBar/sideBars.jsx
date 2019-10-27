import React from 'react';
import s from './SideBars.module.css'
import SideBar from "./SideBar";


const SideBars = (props) => {

    let sideBar = props.state.map(el => <SideBar title={el.title} />);
    return (

        <div className={s.allFriends}>
            <div className={s.fr}>
            <div>Friends</div>
            </div>
            <div className={s.friends}>
                {sideBar}

        </div>
        </div>

    );
};
export default SideBars;

