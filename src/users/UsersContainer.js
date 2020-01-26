import React from 'react'
import {connect} from "react-redux";
import Users from "./Users";
import Preloader from "../components/common/preloader/Preloader";
import {follow, getUsers, setCurrentPage, toogleFollowingProgress, unfollow} from "../Redux/usersReducer";
import {withAuthRedirect} from "../hoc/withAuthRedirect";


class UsersContainer extends React.Component {
    componentDidMount = () => {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    };

    onPageChanged=(pageNumber)=>{
        this.props.getUsers(pageNumber, this.props.pageSize);
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
        users: state.userPage.users,
        pageSize: state.userPage.pageSize,
        totalUsersCount: state.userPage.totalUsersCount,
        currentPage: state.userPage.currentPage,
        isFetching: state.userPage.isFetching,
        followingInProgress: state.userPage.followingInProgress,
        isAuth:state.auth.isAuth
    };
};
let withRedirect = withAuthRedirect(UsersContainer);
export default connect (mapStateToProps,
    {follow, unfollow,
     setCurrentPage,toogleFollowingProgress,
        getUsers
    }
     )(withRedirect)