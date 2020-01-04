
import React from 'react'
import Users from "./Users";
import {connect} from "react-redux";
import {followAC, setCurrentPageAC, setUsersAC, setUsersTotalCountAC, unfollowAC} from "../Redux/usersReducer";

let mapStateToProps = (state)=>{
    return {
    users:state.userPage.users,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage
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

      },
      setCurrentPage:(currentPage)=>{

        dispatch(setCurrentPageAC(currentPage))
      },
      setTotalUsersCount:(totalCount)=>{

        dispatch(setUsersTotalCountAC(totalCount))
      }
  }};
export default connect (mapStateToProps,mapDispatchToProps)(Users)