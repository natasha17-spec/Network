import React from 'react'
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../components/common/preloader/Preloader";
import {
    follow,
    setCurrentPage,
    setTotalUsersCount,
    setUsers,
    toogleFollowingProgress,
    toogleIsFetching,
    unfollow
} from "../Redux/usersReducer";
import {usersAPI} from "../API/Api";


class UsersContainer extends React.Component {

    componentDidMount = () => {
        debugger

this.props.toogleIsFetching(true);
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                this.props.toogleIsFetching(false);
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });
    };

    onPageChanged=(pageNumber)=>{
         this.props.setCurrentPage(pageNumber);
        this.props.toogleIsFetching(true);
        usersAPI.getUsers(pageNumber,this.props.pageSize)
            .then(data => {
                this.props.toogleIsFetching(false);
                this.props.setUsers(data.items)
            });
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
                              isFetching={this.props.isFetching}
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
        followingInProgress: state.userPage.followingInProgress,

    };

};

export default connect (mapStateToProps,
    {follow, unfollow,setUsers,
     setCurrentPage, setTotalUsersCount,toogleIsFetching,toogleFollowingProgress}
     )(UsersContainer)