import React from 'react'
// @ts-ignore
import Users from "./Users";
import Preloader from "../components/common/preloader/Preloader";
import {follow, getUsers, setCurrentPage, toogleFollowingProgress, unfollow} from "../Redux/UsersReducer";
import {UserType} from "../types/types";
import {AppStateType} from "../Redux/redux-store";
// @ts-ignore
import {connect} from 'react-redux'
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getsUsers,
    getTotalUsersCount
} from "../Redux/users-selector";
import {compose} from "redux";

type PropsType = {
    currentPage: number,
    pageSize: number,
    isFetching: boolean,
    totalUsersCount: number,
    followingInProgress: Array<number>
    users: Array<UserType>,

    unfollow: () => void,
    follow: () => void,
    getUsers: (pageNumber: number, pageSize: number) => void,
}


class UsersContainer extends React.Component<PropsType> {
    componentDidMount = () => {
        const {currentPage, pageSize} = this.props;
        this.props.getUsers(currentPage, pageSize);
    };

    onPageChanged = (pageNumber: number) => {
        const {pageSize} = this.props;
        this.props.getUsers(pageNumber, pageSize);
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   followingInProgress={this.props.followingInProgress}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        users: getsUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

export default compose(connect(mapStateToProps,
        {
            follow, unfollow,
            setCurrentPage, toogleFollowingProgress,
            getUsers
        }))(UsersContainer)