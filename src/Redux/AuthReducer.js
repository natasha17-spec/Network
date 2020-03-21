import {authAPI, securityAPI} from "../API/Api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCSESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCSESS';

    let inicialState = {
    id: null,
    email:null,
        login:null,
    isFetching:false,
    isAuth: false,
    captchaUrl:null
};

const authReducer = (state = inicialState, action) => {
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


export const setAuthUserData = (id,email,login,isAuth) => (
    {type: SET_USER_DATA, payload: {id,email,login,isAuth}});


export const getCaptchaUrlSuccsess = (captchaUrl) => (
    {type: GET_CAPTCHA_URL_SUCCSESS, payload: {captchaUrl}});

export const authMe = () => async (dispatch) => {
    let response = await authAPI.me();
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};

export const login = (email, password, rememberMe, captcha) =>
    async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe,captcha)
    if (response.data.resultCode === 0) {
        dispatch(authMe())
    } else {
        if (response.data.resultCode===10){
            dispatch(getCaptchaUrl());
        }
        let message = response.data.messages.length > 0 ?
            response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", {_error: message}));

    }
};

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
};

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSuccsess(captchaUrl));
};
export default authReducer;