import {createSelector} from "reselect";

const getUsersSelector = (state) => {
    return state.userPage.users
}
export const getsUsers = createSelector(
    getUsersSelector,(users) => {
        return users.filter(u => true)})

export const getPageSize = (state) => {
    return state.userPage.pageSize;
};

export const getTotalUsersCount = (state) => {
    return state.userPage.totalUsersCount;
};

export const getCurrentPage = (state) => {
    return state.userPage.currentPage;
};

export const getIsFetching = (state) => {
    return state.userPage.isFetching;
};
export const getFollowingInProgress = (state) => {
    return state.userPage.followingInProgress;
};