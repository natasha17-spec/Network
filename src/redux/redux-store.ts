import {Action, applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware, {ThunkAction} from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import profileReducer from "./ProfileReducer";
import dialogsReducer from "./DialogsReducer";
import navBarReducer from "./NavBarReducer";
import usersReducer from "./UsersReducer";
import authReducer from "./AuthReducer";
import appReducer from "./App-reducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

let rootReducers = combineReducers(
    {
        profilePage: profileReducer,
        dialogsPage: dialogsReducer,
        navBar: navBarReducer,
        userPage: usersReducer,
        auth: authReducer,
        form: formReducer,
        app: appReducer
    }
);
type RootReducerType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducerType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
export default store;