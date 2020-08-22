import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {authMe} from "./AuthReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

type InitialStateType = {
    initialized:boolean
}
let initialState:InitialStateType = {
    initialized: false
};

const appReducer = (state = initialState, action:InitializedSuccessType):InitialStateType => {
    if (action.type === INITIALIZED_SUCCESS) {
        return {
            ...state,
            initialized: true
        };
    } else {
        return state
    }
};
//*Action creators type
type InitializedSuccessType = {
    type: typeof INITIALIZED_SUCCESS
}
//*Action creators
export const initializedSuccess = (): InitializedSuccessType => ({type: INITIALIZED_SUCCESS});
//*Общий
type ThunkType = ThunkAction<void, AppStateType, unknown, InitializedSuccessType>
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, InitializedSuccessType>
//*Thunk
export const initializeApp = (): ThunkType => (dispatch: ThunkDispatchType) => {
    let promise = dispatch(authMe());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}

export default appReducer;
