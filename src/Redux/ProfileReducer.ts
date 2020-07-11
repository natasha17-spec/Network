import {stopSubmit} from "redux-form";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {PhotosType, ProfileType} from "../types/types";
import {usersAPI} from "../api/getUsers-api";
import {profileAPI} from "../api/profile-api";

const ADD_POST = 'samurai-network/profile/ADD-POST';
const SET_USERS_PROFILE = 'samurai-network/profile/SET_USERS_PROFILE';
const FULLNAME_PROFILE = 'samurai-network/profile/FULLNAME_PROFILE';
const ABOUT_ME_PROFILE = 'samurai-network/profile/ABOUT_ME_PROFILE';
const LOOKING_FOR_A_JOB = 'samurai-network/profile/LOOKING_FOR_A_JOB';
const LOOKING_FOR_A_JOB_DESCRIPTION = 'samurai-network/profile/LOOKING_FOR_A_JOB_DESCRIPTION';
const SET_STATUS = 'samurai-network/profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'samurai-network/profile/SAVE_PHOTO_SUCCESS';



type InitialStateType = {
    posts: Array<{ id: number, message: any, likesCount: number }>,
    profile: (null | ProfileType),
    fullName: (null | string),
    aboutMe:(null | string),
    lookingForAJob:(null | boolean),
    lookingForAJobDescription:(null | string),
    status: (null | string),
    newPostText: string,
    id:  null |  number
}

let initialState = {
    posts: [
        {id: 1, message: 'I am fine!', likesCount: 45},
        {id: 2, message: 'Hey! How are you?', likesCount: 23}
    ],
    profile: null,
    fullName: null,
    aboutMe: null,
    lookingForAJob: null,
    lookingForAJobDescription: null,
    status: "",
    newPostText: "",
    id: null,
};

const profileReducer = (state: InitialStateType = initialState, action: ProfileActionType) => {
    switch (action.type) {
        case ADD_POST: {
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
        case SET_USERS_PROFILE: {
            return {...state, profile: action.profile};
        }
        case FULLNAME_PROFILE: {

            return {...state, fullName: action.fullName};
        }
        case ABOUT_ME_PROFILE: {

            return {...state, aboutMe: action.aboutMe};
        }
        case LOOKING_FOR_A_JOB: {

            return {...state, lookingForAJob: action.lookingForAJob};
        }
        case LOOKING_FOR_A_JOB_DESCRIPTION: {

            return {...state, lookingForAJobDescription: action.lookingForAJobDescription};
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            };
        }
        case SAVE_PHOTO_SUCCESS:
            return {...state, profile: {...state.profile, photos: action.photos}};
        default:
            return state
    }
};

//*Action creators type
type AddPostActionCreatorType = {
    type: typeof ADD_POST,
    newPostText: any
}


export type SetProfileType = {
    resultCode: number,
    messages: Array<string>
    data: object
}

type SavePhotoSuccessType = {
    type: typeof SAVE_PHOTO_SUCCESS,
    photos: PhotosType,
}
type SetUserProfileType = {
    type: typeof SET_USERS_PROFILE,
    profile:  (null | ProfileType),
}
type SetStatusType = {
    type: typeof SET_STATUS,
    status: string
}
type SetFullnameProfileType = {
    type: typeof FULLNAME_PROFILE,
    fullName: (null | string)
}
type SetAboutMeProfileType = {
    type: typeof ABOUT_ME_PROFILE,
    aboutMe: (string | number)
}
type SetlookingForAJobProfileType = {
    type: typeof LOOKING_FOR_A_JOB,
    lookingForAJob: boolean
}
type setlookingForAJobDescriptionProfile = {
    type: typeof LOOKING_FOR_A_JOB_DESCRIPTION,
    lookingForAJobDescription: string
}
//*Action creators
export const addPostActionCreator = (newPostText: any): AddPostActionCreatorType => ({type: ADD_POST, newPostText});
export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos})
export const setUserProfile = (profile:null | ProfileType): SetUserProfileType => ({type: SET_USERS_PROFILE, profile});
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status});
export const setFullnameProfile = (fullName: string): SetFullnameProfileType => ({type: FULLNAME_PROFILE, fullName});
export const setAboutMeProfile = (aboutMe: (string | number)): SetAboutMeProfileType => ({
    type: ABOUT_ME_PROFILE,
    aboutMe
});
export const setlookingForAJobProfile = (lookingForAJob: boolean): SetlookingForAJobProfileType => ({
    type: LOOKING_FOR_A_JOB,
    lookingForAJob
});
export const setlookingForAJobDescriptionProfile = (lookingForAJobDescription: string): setlookingForAJobDescriptionProfile => ({
    type: LOOKING_FOR_A_JOB_DESCRIPTION,
    lookingForAJobDescription
});

type ProfileActionType =
    AddPostActionCreatorType |
    SavePhotoSuccessType |
    SetUserProfileType |
    SetStatusType |
    SetFullnameProfileType |
    SetAboutMeProfileType |
    SetlookingForAJobProfileType |
    setlookingForAJobDescriptionProfile


//*Общий
type ThunkType = ThunkAction<void, AppStateType, unknown, ProfileActionType>
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, ProfileActionType>

export const getUserProfile = (userId: number):ThunkType => async (dispatch:ThunkDispatchType) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};
export const getStatus = (userId:number) => async (dispatch:ThunkDispatchType) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
};
export const updateStatus = (status: string) => async (dispatch:ThunkDispatchType) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};
export const savePhoto = (file:any) => async (dispatch:ThunkDispatchType) => {
    let response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};
export const saveProfile = (profile:SetProfileType) => async (dispatch:ThunkDispatchType, getState:() => AppStateType)=> {
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        // @ts-ignore
        dispatch(stopSubmit("edit-profile",
            {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
};
export default profileReducer;

