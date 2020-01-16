import {applyMiddleware, combineReducers, createStore} from "redux";
import navBarReducer from "./NavBarReducer";
import dialogsReducer from "./DialogsReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./AuthReducer";
import thunkMiddleware from "redux-thunk"

let reducers = combineReducers(
    {
        profilePage:profileReducer,
        dialogsPage:dialogsReducer,
        navBar:navBarReducer,
        userPage:usersReducer,
        auth: authReducer
    }
);
let store = createStore(reducers, applyMiddleware(thunkMiddleware));
window.store= store;
export default store;