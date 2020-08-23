import {stopSubmit} from "redux-form";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {usersAPI} from "../api/getUsers-api";
import {profileAPI} from "../api/profile-api";

let initialState = {
    posts: [
        {id: 1, message: 'I am fine!', likesCount: 45},
        {id: 2, message: 'Hey! How are you?', likesCount: 23}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
};

const profileReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'ADD_POST': {
            let newPosts = {
                id: 5,
                message: action.newPostText,//state.newPostText
                likesCount: 0
            };

            return {
                ...state,
                posts: [...state.posts, newPosts],
                newPostText: ""
            };
        }
        case 'SET_USERS_PROFILE': {
            return {...state, profile: action.profile};
        }
        case 'FULLNAME_PROFILE': {

            return {...state, fullName: action.fullName};
        }
        case 'ABOUT_ME_PROFILE': {

            return {...state, aboutMe: action.aboutMe};
        }
        case 'LOOKING_FOR_A_JOB': {

            return {...state, lookingForAJob: action.lookingForAJob};
        }
        case 'LOOKING_FOR_A_JOB_DESCRIPTION': {

            return {...state, lookingForAJobDescription: action.lookingForAJobDescription};
        }
        case 'SET_STATUS': {
            return {
                ...state,
                status: action.status
            };
        }
        case 'SAVE_PHOTO_SUCCESS':
            return {...state, profile: {...state.profile, photos: action.photos}};
        default:
            return state
    }
};


//*Action creators
const actions = {
    addPostActionCreator: (newPostText: any) => ({type: 'ADD_POST', newPostText} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const),
    setUserProfile: (profile: null | ProfileType) => ({type: 'SET_USERS_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
    setFullnameProfile: (fullName: string) => ({type: 'FULLNAME_PROFILE', fullName} as const),
    setAboutMeProfile: (aboutMe: (string | number)) => ({type: 'ABOUT_ME_PROFILE', aboutMe} as const),
    setlookingForAJobProfile: (lookingForAJob: boolean) => ({type: 'LOOKING_FOR_A_JOB', lookingForAJob} as const),
    setlookingForAJobDescriptionProfile: (lookingForAJobDescription: string) => ({
        type: 'LOOKING_FOR_A_JOB_DESCRIPTION',
        lookingForAJobDescription
    } as const)
}


//*Общий
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsType>
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ActionsType>

export const getUserProfile = (userId: number): ThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(actions.setUserProfile(response.data));
};
export const getStatus = (userId: number) => async (dispatch: ThunkDispatchType) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(response.data));
};
export const updateStatus = (status: string) => async (dispatch: ThunkDispatchType) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(actions.setStatus(status));
    }
};
export const savePhoto = (file: any) => async (dispatch: ThunkDispatchType) => {
    let response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(response.data.data.photos));
    }
};
export const saveProfile = (profile: ProfileType) => async (dispatch: ThunkDispatchType, getState: () => AppStateType) => {
    const userId = getState().auth.id;
    const data = await profileAPI.saveProfile(profile);

    if (data.data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId));
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        // @ts-ignore
        dispatch(stopSubmit("edit-profile",
            {_error: data.data.messages[0]}));
        return Promise.reject(data.data.messages[0]);
    }
};
export default profileReducer;

