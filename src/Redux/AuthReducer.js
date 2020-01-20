import {usersAPI} from "../API/Api";

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
            isAuth: true
        };
    } else {
        return state
    }
};


export const setAuthUserData = (id,email,login,isAuth) => ({type: SET_USER_DATA, data: {id,email,login,isAuth}});
export default authReducer;

export const authMe=(id, email, login)=>{
    return  (dispatch)=>{

        usersAPI.authMe(id, email, login)
            .then(data => {
                if (data.resultCode === 0) {
                    let {id, login, email} = data.data;
                   dispatch(setAuthUserData(id, email, login));
                }
            });
    }}