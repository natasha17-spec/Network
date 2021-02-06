import React from 'react'
import Users from "./Users";
import {useSelector} from 'react-redux'
import {getIsFetching} from "../../redux/users-selector";
import Preloader from "../common/preloader/Preloader";


export const UsersPage: React.FC = (props) => {

    const isFetching = useSelector(getIsFetching)
    return <>
        {isFetching ? <Preloader/> : null}
        <Users/>
    </>
}
