
import React from 'react'
import Users from "./Users";
import {connect} from "react-redux";
import {followAC, setUsersAC, unfollowAC} from "../Redux/usersReducer";

let mapStateToProps = (state)=>{
    return {
    users:state.userPage.users
    }
};
let mapDispatchToProps = (dispatch)=>{
  return{
    follow: (userId)=> {

        dispatch(followAC(userId));
    },
   unfollow: (userId)=> {

       dispatch(unfollowAC(userId));
  },
   setUsers:(users)=> {
          dispatch(setUsersAC(users));

      }}};
export default connect (mapStateToProps,mapDispatchToProps)(Users)