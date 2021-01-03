import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

const getUsersSelector = (state:AppStateType) => {
    return state.userPage.users
}
export const getsUsers = createSelector(
    getUsersSelector,(users) => {
        return users.filter(u => true)})

export const getPageSize = (state:AppStateType) => {
    return state.userPage.pageSize;
};

export const getTotalUsersCount = (state:AppStateType) => {
    return state.userPage.totalUsersCount;
};

export const getCurrentPage = (state:AppStateType) => {
    return state.userPage.currentPage;
};

export const getIsFetching = (state:AppStateType) => {
    return state.userPage.isFetching;
};
export const getFollowingInProgress = (state:AppStateType) => {
    return state.userPage.followingInProgress;
};

export const getUsersFilter = (state:AppStateType) => {
    return state.userPage.filter;
};