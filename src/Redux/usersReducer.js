import {usersAPI} from "../API/Api";
import {updateObjectInArray} from "../utils/objects-helper";

const FOLLOW = 'samurai-network/users/FOLLOW';
const UNFOLLOW = 'samurai-network/users/UNFOLLOW';
const SET_USERS = 'samurai-network/users/SET_USERS';
const SET_CURRENT_PAGE ='samurai-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT ='samurai-network/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING ='samurai-network/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS ='samurai-network/users/TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [ ],
    pageSize:15,
    totalUsersCount:28,
    currentPage:1,
    isFetching:false,
    followingInProgress:false
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users:updateObjectInArray(state.users, action.userId,
                    "id", {followed:true})
                       };
        case UNFOLLOW:
            return {
                ...state,
                users:updateObjectInArray(state.users,action.userId, "id", {followed:false})
            };
        case SET_USERS:
            return {...state, users: action.users};

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};

        case SET_TOTAL_USERS_COUNT:

            return {...state, totalUsersCount: action.count};
        case TOGGLE_IS_FETCHING:

            return {...state, isFetching:action.isFetching};
         case TOGGLE_IS_FOLLOWING_PROGRESS:

                     return {...state, followingInProgress:action.isFetching};

        default:
            return state
    }
};


export const followSuccsess = (userId) => {return {type: FOLLOW, userId}};
export const unfollowSuccsess = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setTotalUsersCount = (totalUsersCount)=>({type:SET_TOTAL_USERS_COUNT,count:totalUsersCount});
export const toogleIsFetching = (isFetching)=>({type:TOGGLE_IS_FETCHING,isFetching});
export const toogleFollowingProgress = (isFetching)=>({type:TOGGLE_IS_FOLLOWING_PROGRESS,isFetching});

export const getUsers=(page, pageSize)=>{
    return async (dispatch)=>{
        dispatch(toogleIsFetching(true));
        dispatch(setCurrentPage(page));
       let data= await usersAPI.getUsers(page, pageSize);
            dispatch(toogleIsFetching(false));
            dispatch(setUsers(data.items));
            dispatch(setTotalUsersCount(data.totalCount));
    };
};
export default usersReducer;

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {

    dispatch(toogleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        debugger
        dispatch(actionCreator(userId));
    }
    dispatch(toogleFollowingProgress(false, userId));
}

export const follow =  (userId) => {
    debugger
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccsess);
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccsess);
    }
}