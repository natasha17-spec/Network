import React from 'react';
import s from './Posts.module.css'

const Posts = (props) => {

    return (
        <div className={s.allPost}>
            <div className={s.item}>
                <img src='https://steamuserimages-a.akamaihd.net/ugc/949597721087843083/F24FA6FA436403A9FD92B1415B878AFA4F505237/?imw=512&amp;imh=320&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true'/>
                {props.message}
                <div>
                    <button>Like</button> {props.likesCount}
                </div>
            </div>
        </div>
    );
};
export default Posts;