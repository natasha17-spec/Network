import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import navBarReducer from "./NavBarReducer";
import dialogsReducer from "./DialogsReducer";
import profileReducer from "./ProfileReducer";
import usersReducer from "./UsersReducer";
import authReducer from "./AuthReducer";
import thunkMiddleware from "redux-thunk"
import {reducer as formReducer} from 'redux-form'
import appReducer from "./App-reducer";

declare global {
        interface Window {
                __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
        }
}

let rootReducers = combineReducers(
    {
        profilePage:profileReducer,
        dialogsPage:dialogsReducer,
        navBar:navBarReducer,
        userPage:usersReducer,
        auth: authReducer,
        form: formReducer,
        app:appReducer
    }
);
type PropertiesTypes<T> = T extends {[key:string]:infer U} ? U: never
export type InferActionsTypes<T extends {[key:string]:(...args:any[])=>any}>=ReturnType<PropertiesTypes<T>>
type RootReducerType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducerType>


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
export default store;