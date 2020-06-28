import React from 'react'
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../components/common/preloader/Preloader";
import {follow, getUsers, setCurrentPage, toogleFollowingProgress, unfollow} from "../Redux/UsersReducer";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getsUsers,
    getTotalUsersCount
} from "../Redux/users-selector";


class UsersContainer extends React.Component {
    componentDidMount = () => {
        const {currentPage,pageSize}= this.props;
        this.props.getUsers(currentPage, pageSize);
    };

    onPageChanged=(pageNumber)=>{
        const {pageSize}=this.props;
        this.props.getUsers(pageNumber,pageSize);
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
                              followingInProgress={this.props.followingInProgress}
                       />
                   </>
        )
    }}

let mapStateToProps = (state)=> {
    return {
        users: getsUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),

    };
};

export default compose(
    withAuthRedirect,
    connect(mapStateToProps,
        {
            follow, unfollow,
            setCurrentPage, toogleFollowingProgress,
            getUsers
        }))(UsersContainer)