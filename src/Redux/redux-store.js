import {combineReducers, createStore} from "redux";
import navBarReducer from "./NavBarReducer";
import dialogsReducer from "./DialogsReducer";
import profileReducer from "./profileReducer";
import usersReducer from "./usersReducer";
import authReducer from "./AuthReducer";

let reducers = combineReducers(
    {
        profilePage:profileReducer,
        dialogsPage:dialogsReducer,
        navBar:navBarReducer,
        userPage:usersReducer,
        auth: authReducer
    }
);
let store = createStore(reducers);
window.store= store;
export default store;