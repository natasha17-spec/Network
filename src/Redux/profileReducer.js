import {profileAPI, usersAPI} from "../API/Api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'samurai-network/profile/ADD-POST';
const SET_USERS_PROFILE = 'samurai-network/profile/SET_USERS_PROFILE';
const FULLNAME_PROFILE = 'samurai-network/profile/FULLNAME_PROFILE';
const ABOUTME_PROFILE = 'samurai-network/profile/ABOUTME_PROFILE';
const LOOKING_FOR_A_JOB = 'samurai-network/profile/LOOKING_FOR_A_JOB';
const LOOKING_FOR_A_JOB_DESCRIPTION = 'samurai-network/profile/LOOKING_FOR_A_JOB_DESCRIPTION';
const SET_STATUS = 'samurai-network/profile/SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'samurai-network/profile/SAVE_PHOTO_SUCCESS';

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
    newPostText: ""
};

const profileReducer = (state = initialState, action) => {
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
        case ABOUTME_PROFILE: {

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


export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const savePhotoSuccess = (photos) => ({type: SAVE_PHOTO_SUCCESS, photos})
export const setUserProfile = (profile) => ({type: SET_USERS_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});
export const setFullnameProfile = (fullName) => ({type: FULLNAME_PROFILE, fullName});
export const setAboutMeProfile = (aboutMe) => ({type: ABOUTME_PROFILE, aboutMe});
export const setlookingForAJobProfile = (lookingForAJob) => ({type: LOOKING_FOR_A_JOB, lookingForAJob});
export const setlookingForAJobDescriptionProfile = (lookingForAJobDescription) => ({
    type: LOOKING_FOR_A_JOB_DESCRIPTION,
    lookingForAJobDescription
});
export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};
export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
};
export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
};
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    }
};
export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit("edit-profile",
            {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
};
export default profileReducer;

