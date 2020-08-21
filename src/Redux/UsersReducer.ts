import {updateObjectInArray} from "../utils/objects-helper";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {UserType} from "../types/types";
import {usersAPI} from "../api/getUsers-api";

const FOLLOW = 'samurai-network/users/FOLLOW';
const UNFOLLOW = 'samurai-network/users/UNFOLLOW';
const SET_USERS = 'samurai-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'samurai-network/users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'samurai-network/users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'samurai-network/users/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'samurai-network/users/TOGGLE_IS_FOLLOWING_PROGRESS';


type InitialStateType = {
    users: Array<UserType>,
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    isFetching: boolean,
    followingInProgress: Array<number>
}

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 15,
    totalUsersCount: 28,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>
};

const usersReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId,
                    "id", {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case SET_USERS:
            return {...state, users: action.users};

        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.currentPage};

        case SET_TOTAL_USERS_COUNT:

            return {...state, totalUsersCount: action.totalUsersCount};
        case TOGGLE_IS_FETCHING:

            return {...state, isFetching: action.isFetching};
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }
        default:
            return state
    }
};

//*Action creators type
type FollowSuccsessType = {
    type: typeof FOLLOW,
    userId: number
}
type UnfollowSuccsessType = {
    type: typeof UNFOLLOW,
    userId: number
}
type SetUsersType = {
    type: typeof SET_USERS,
    users: Array<UserType>
}
type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number,
}
type ToogleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING,
    isFetching: boolean
}
type ToogleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean,
    userId?: number
}
type ActionsType = InferActionsTypes<typeof actions>

//*Action creators
export const actions = {
    followSuccsess:  (userId: number): FollowSuccsessType => {return {type: FOLLOW, userId}},
    unfollowSuccsess: (userId: number): UnfollowSuccsessType => ({type: UNFOLLOW, userId}),
    setUsers: (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users}),
    setCurrentPage: (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage}),
    setTotalUsersCount: (totalUsersCount: number): SetTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT,totalUsersCount}),
    toogleIsFetching:  (isFetching: boolean): ToogleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching}),
    toogleFollowingProgress:  (isFetching: boolean, userId?: number): ToogleFollowingProgressType => ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}),
}

//*Общий
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionsType>


export const getUsers = (page: number, pageSize: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        dispatch(actions.toogleIsFetching(true));
        dispatch(actions.setCurrentPage(page));
        let data = await usersAPI.getUsers(page, pageSize);
        dispatch(actions.toogleIsFetching(false));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
    };
};
export default usersReducer;

const followUnfollowFlow = async (dispatch: ThunkDispatchType, userId: number, apiMethod: any, actionCreator: (userId: number) => FollowSuccsessType | UnfollowSuccsessType) => {
    dispatch(actions.toogleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toogleFollowingProgress(false, userId));
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccsess);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch: ThunkDispatchType) => {
        followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccsess);
    }
}