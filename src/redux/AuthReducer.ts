import {ResultCodeEnum, ResultCodeForCaptchaEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCSESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCSESS';

let initialState = {
    userId: null as (number | null),
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null// if null, then captcha is not required
};
const authReducer = (state= initialState, action:AuthActionType) => {
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
type SetAuthUserDataActionPayloadType = {
    id: null | number
    email: null | string
    login: null | string
    isAuth: boolean
}

type SetAuthUserDataType = {
    type: typeof SET_USER_DATA,
    payload: SetAuthUserDataActionPayloadType
}
type GetCaptchaUrlSuccsessType = {
    type: typeof GET_CAPTCHA_URL_SUCCSESS,
    payload: { captchaUrl:string | null}}

export const setAuthUserData = (id: null | number, email: null | string, login: null | string, isAuth: boolean): SetAuthUserDataType => (
    {type: SET_USER_DATA, payload: {id, email, login, isAuth}});


export const getCaptchaUrlSuccsess = (captchaUrl: string): GetCaptchaUrlSuccsessType => (
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

export const login = (email:  string, password: string, rememberMe: boolean, captcha: string | null): ThunkType =>
    async (dispatch: ThunkDispatchType) => {
        let response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === ResultCodeEnum.Sucsess) {
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
    if (response.data.resultCode === ResultCodeEnum.Sucsess) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch: ThunkDispatchType) => {
    const data  = await securityAPI.getCaptchaUrl();
    const captchaUrl = data.url;
    dispatch(getCaptchaUrlSuccsess(captchaUrl));
};
export default authReducer;