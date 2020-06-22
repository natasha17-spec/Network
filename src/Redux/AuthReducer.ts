import {authAPI, securityAPI} from "../API/Api";
import {stopSubmit} from "redux-form";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCSESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCSESS';

type InitialStateType = {
    id: null | number,
    email: null | string,
    login: null | string,
    isFetching: boolean,
    isAuth: boolean,
    captchaUrl: null | boolean,
    password: any,
    rememberMe: boolean,
}


let initialState = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    captchaUrl: null,
    password: null,
    rememberMe: false,
};

const authReducer = (state: InitialStateType = initialState, action:AuthActionType) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCSESS:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state
    }
};

//*Action creators type
type SetAuthUserDataType = {
    type: typeof SET_USER_DATA,
    payload: {}
}
type GetCaptchaUrlSuccsessType = {
    type: typeof GET_CAPTCHA_URL_SUCCSESS,
    payload: {}
}

export const setAuthUserData = (id: null | number, email: null | string, login: null | string, isAuth: boolean): SetAuthUserDataType => (
    {type: SET_USER_DATA, payload: {id, email, login, isAuth}});


export const getCaptchaUrlSuccsess = (captchaUrl: null | boolean): GetCaptchaUrlSuccsessType => (
    {type: GET_CAPTCHA_URL_SUCCSESS, payload: {captchaUrl}});

type AuthActionType = SetAuthUserDataType | GetCaptchaUrlSuccsessType
//*Общий
type ThunkType = ThunkAction<void, AppStateType, unknown, AuthActionType>
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, AuthActionType>

export const authMe = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

// export function stopSubmit(form: string, errors?: Object): Action;

export const login = (email: null | string, password: any, rememberMe: boolean, captcha: null | boolean): ThunkType =>
    async (dispatch: ThunkDispatchType) => {
        let response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(authMe())
        } else {
            if (response.data.resultCode === 10) {
                dispatch(getCaptchaUrl());
            }
            let message = response.data.messages.length > 0 ?
                response.data.messages[0] : "Some error";

            // @ts-ignore
            dispatch(stopSubmit("login", {_error: message}));
        }
    };

export const logout = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccsess(captchaUrl));
};
export default authReducer;