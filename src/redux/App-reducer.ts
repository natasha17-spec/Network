import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {authMe} from "./AuthReducer";


let initialState = {
    initialized: false
};
export type InitialStateType = typeof initialState

const appReducer = (state = initialState, action:AppActionsType):InitialStateType => {
    if (action.type === 'INITIALIZED_SUCCESS') {
        return {
            ...state,
            initialized: true
        };
    } else {
        return state
    }
};
const actions={
    //*Action creators
     initializedSuccess:() => ({type: 'INITIALIZED_SUCCESS'}as const)
}
//*Общий
type AppActionsType = InferActionsTypes<typeof actions>
type ThunkType = ThunkAction<void, AppStateType, unknown, AppActionsType>
type ThunkDispatchType = ThunkDispatch<AppStateType, unknown, AppActionsType>
//*Thunk
export const initializeApp = (): ThunkType => (dispatch: ThunkDispatchType) => {
    let promise = dispatch(authMe());
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initializedSuccess());
        });
}

export default appReducer;
