import React from 'react'
import {connect} from "react-redux";
import * as axios from "axios";
import Users from "./Users";
import Preloader from "../components/common/preloader/Preloader";
import {follow, setCurrentPage, setTotalUsersCount, setUsers, toogleIsFetching, unfollow} from "../Redux/usersReducer";


class UsersContainer extends React.Component {
    componentDidMount = () => {
this.props.toogleIsFetching(true);
        axios.get(`https:social-network.samuraijs.com/api/1.0/users?page=
         ${this.props.currentPage}&count=${this.props.pageSize}`,{
            withCredentials: true
        })
            .then(response => {
                this.props.toogleIsFetching(false);
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    };

    onPageChanged=(pageNumber)=>{
               this.props.setCurrentPage(pageNumber);
        this.props.toogleIsFetching(true);
        axios.get(`https:social-network.samuraijs.com/api/1.0/users?page=
         ${pageNumber}&count=${this.props.pageSize}`,{
            withCredentials: true
        })
            .then(response => {
                this.props.toogleIsFetching(false);
                this.props.setUsers(response.data.items)});
    };

    render  ()  {

               return (
                   <>
                          {this.props.isFetching ? <Preloader/> : null }

                       <Users setTotalUsersCount={this.props.setTotalUsersCount}
                              pageSize={this.props.pageSize}
                              currentPage={this.props.currentPage}
                              onPageChanged={this.onPageChanged}
                              users={this.props.users}
                              follow={this.props.follow}
                              unfollow={this.props.unfollow}
                              totalUsersCount={this.props.totalUsersCount}
                       />
                   </>
        )
    }}


let mapStateToProps = (state)=> {
    return {
        users: state.userPage.users,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage,
        isFetching: state.userPage.isFetching,

    };

};

export default connect (mapStateToProps,
    {follow, unfollow,setUsers,
     setCurrentPage, setTotalUsersCount,toogleIsFetching}
     )(UsersContainer)