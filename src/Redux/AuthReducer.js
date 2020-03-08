import {authAPI} from "../API/Api";
import {stopSubmit} from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';

    let inicialState = {
    id: null,
    email:null,
        login:null,
    isFetching:false,
    isAuth: false
};

    const authReducer = (state = inicialState, action) => {
    if (action.type === SET_USER_DATA) {
        return {
            ...state,
            ...action.data,
        };
    } else {
        return state
    }
};
    export default authReducer;


    export const setAuthUserData = (id,email,login,isAuth) => (
    {type: SET_USER_DATA, data: {id,email,login,isAuth}});

export const authMe = () => async (dispatch) => {
    let response = await authAPI.me()
    if (response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
};


export const login = (email, password, rememberMe) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe)
    if (response.data.resultCode === 0) {
        dispatch(authMe())
    } else {
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