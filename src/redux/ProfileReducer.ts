import {FormAction, stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, InferActionsTypes} from "./redux-store";

let initialState = {
    posts: [
        {id: 1, message: 'I am fine!', likesCount: 45},
        {id: 2, message: 'Hey! How are you?', likesCount: 23}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: "",
    fullName: "",
    aboutMe: '',
    lookingForAJob: false,
    lookingForAJobDescription: ''
};
const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
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
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType};
        default:
            return state
    }
};


//*Action creators
const actions = {
    addPostActionCreator: (newPostText: any) => ({type: 'ADD_POST', newPostText} as const),
    savePhotoSuccess: (photos: PhotosType) => ({type: 'SAVE_PHOTO_SUCCESS', photos} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'SET_USERS_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'SET_STATUS', status} as const),
    setFullnameProfile: (fullName: string) => ({type: 'FULLNAME_PROFILE', fullName} as const),
    setAboutMeProfile: (aboutMe: (string)) => ({type: 'ABOUT_ME_PROFILE', aboutMe} as const),
    setlookingForAJobProfile: (lookingForAJob: boolean) => ({type: 'LOOKING_FOR_A_JOB', lookingForAJob} as const),
    setlookingForAJobDescriptionProfile: (lookingForAJobDescription: string) => ({
        type: 'LOOKING_FOR_A_JOB_DESCRIPTION',
        lookingForAJobDescription
    } as const)
}


//*Общий

export const getUserProfile = (userId: number): ThunkType => async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(data))
}
export const getStatus = (userId: number): ThunkType => async (dispatch) => {
    let data = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(data))
}
export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status)

        if (data.resultCode === 0) {
            dispatch(actions.setStatus(status))
        }
    } catch (error) {
        //
    }
}
export const savePhoto = (file: File): ThunkType => async (dispatch) => {
    let data = await profileAPI.savePhoto(file)

    if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().auth.userId
    const data = await profileAPI.saveProfile(profile)

    if (data.resultCode === 0) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error("userId can't be null")
        }
    } else {
        dispatch(stopSubmit("edit-profile", {_error: data.messages[0]}))
        return Promise.reject(data.messages[0])
    }
}

export default profileReducer;

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>

