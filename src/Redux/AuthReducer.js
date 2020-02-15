import {authAPI} from "../API/Api";

const SET_USER_DATA = 'SET_USER_DATA';

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

export const authMe=()=>(dispatch)=>{
    authAPI.me()
                .then(response => {
                    if (response.data.resultCode === 0) {
                        let {id, login, email} = response.data.data;
                        dispatch(setAuthUserData(id, email, login, true));
                    }
                });
        };


    export const login = (email, password, rememberMe) => (dispatch) => {
        authAPI.login(email, password, rememberMe)
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(authMe())
                }
            });
    };

    export const logout = () => (dispatch) => {
        authAPI.logout()
            .then(response => {
                if (response.data.resultCode === 0) {
                    dispatch(setAuthUserData(null, null, null, false));
                }
            });
    };