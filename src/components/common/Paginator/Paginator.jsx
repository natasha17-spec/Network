import React from "react";
import s from "./Paginator.module.css"

let Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }


    return <div className={s.selectedPage}>
            {pages.map(p => {
                return <span className={props.currentPage === p && 'selectedPage'}
                             onClick={(e) => {
                                 props.onPageChanged(p)
                             }}
                >{p}_</span>
            })}
        </div>
    }

    export default Paginator;