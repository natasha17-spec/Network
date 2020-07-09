import React from 'react'
import Users from "./Users";
import Preloader from "../components/common/preloader/Preloader";
import {follow, getUsers, unfollow} from "../Redux/UsersReducer";
import {UserType} from "../types/types";
import {AppStateType} from "../Redux/redux-store";
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

type MapStateToPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>
}
type MapDispatchToPropsType = {
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
    getUsers: (pageNumber: number, pageSize: number) => void,
    // setCurrentPage:(currentPage: number)=>void,
    // toogleFollowingProgress:(isFetching: boolean, userId?: number)=>void
}

type OwnPropsType = {}
type PropsType = MapDispatchToPropsType & MapStateToPropsType & OwnPropsType

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

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getsUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    };
};

export default compose(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {
        follow, unfollow,
        getUsers
    }))(UsersContainer)