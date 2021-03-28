import {AppStateType} from "./redux-store";

export const selectIsAuth = (state:AppStateType) => {
    return state.auth.isAuth
}
export const selectIsLogin = (state:AppStateType) => {
    return state.auth.login
}
