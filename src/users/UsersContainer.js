import React from 'react'
import {connect} from "react-redux";
import {followAC, setCurrentPageAC, setUsersAC, setUsersTotalCountAC, unfollowAC} from "../Redux/usersReducer";
import * as axios from "axios";
import Users from "./Users";


class UsersContainer extends React.Component {
    componentDidMount() {
        debugger
        axios.get(`https:social-network.samuraijs.com/api/1.0/users?page=
         ${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            });
    }
    onPageChanged=(pageNumber)=>{
        this.props.setCurrentPage(pageNumber);
        axios.get(`https:social-network.samuraijs.com/api/1.0/users?page=
         ${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {this.props.setUsers(response.data.items)});
    };

    render  ()  {
               return (
            <Users            setTotalUsersCount={this.props.setTotalUsersCount}
                              pageSize={this.props.pageSize}
                              currentPage={this.props.currentPage}
                              onPageChanged ={this.onPageChanged}
                              users={this.props.users}
                              follow={this.props.follow}
                              unfollow={this.props.unfollow}
                              totalUsersCount={this.props.totalUsersCount}
            />
        )
    }}

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
export default connect (mapStateToProps,mapDispatchToProps)(UsersContainer)