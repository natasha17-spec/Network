import React from 'react'
import Users from "./Users";
import {FilterType, follow, requestUsers, unfollow} from "../../redux/UsersReducer";
import {UserType} from "../../types/types";
import {connect} from 'react-redux'
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getsUsers,
    getTotalUsersCount, getUsersFilter
} from "../../redux/users-selector";
import {compose} from "redux";
import {AppStateType} from "../../redux/redux-store";
import Preloader from "../common/preloader/Preloader";

type MapStateToPropsType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>,
    filter:FilterType
}
type MapDispatchToPropsType = {
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
    getUsers: (pageNumber: number, pageSize: number, filter: FilterType) => void,
}

type OwnPropsType = {}
type PropsType = MapDispatchToPropsType & MapStateToPropsType

class UsersContainer extends React.Component<PropsType> {
    componentDidMount = () => {
        const {currentPage, pageSize, filter} = this.props;
        this.props.getUsers(currentPage, pageSize, filter);
    };

    onPageChanged = (pageNumber: number) => {
        const {pageSize,filter} = this.props;
        this.props.getUsers(pageNumber, pageSize, filter);
    };
    onFilterChanged=(filter:FilterType)=>{
        const {currentPage, pageSize}=this.props
        this.props.getUsers(currentPage, pageSize, filter);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   onFilterChanged={this.onFilterChanged}
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
        filter:getUsersFilter(state)
    };
};

export default compose(connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {
        follow, unfollow,
       getUsers: requestUsers
    }))(UsersContainer)