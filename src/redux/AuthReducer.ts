import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";


let initialState = {
    userId: null as (number | null),
    // userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null// if null, then captcha is not required
};
type InitialState = typeof initialState
const authReducer = (state = initialState, action: AuthActionsType) => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL_SUCCSESS':
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state
    }
};

//*Action creators type
const actions = {
    setAuthUserData: (id: null | number, email: null | string, login: null | string, isAuth: boolean) => (
        {type: 'SET_USER_DATA', payload: {id, email, login, isAuth}}as const),
    getCaptchaUrlSuccsess: (captchaUrl: string) => (
        {type: 'GET_CAPTCHA_URL_SUCCSESS', payload: {captchaUrl}}as const)
}

//*Общий
type AuthActionsType = InferActionsTypes<typeof actions>
type ThunkType = ThunkAction<void, AppStateType, unknown, AuthActionsType>
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, AuthActionsType>

export const authMe = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(actions.setAuthUserData(id, email, login, true));
    }
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null): ThunkType =>
    async (dispatch: ThunkDispatchType) => {
        let response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === ResultCodeEnum.Success) {
            dispatch(authMe())
        } else {
            if (response.data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
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
    if (response.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false));
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    const data = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccsess(captchaUrl));
};
export default authReducer;