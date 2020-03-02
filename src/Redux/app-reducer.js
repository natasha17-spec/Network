import {authMe} from "./AuthReducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';
    let inicialState = {
    initialized: false
};

const appReducer = (state = inicialState, action) => {
    if (action.type === INITIALIZED_SUCCESS) {
        return {
            ...state,
            initialized: true
        };
    } else {
        return state
    }
};
export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(authMe());

    //dispatch(somethingelse());
    //dispatch(somethingelse());
    Promise.all([promise])
        .then(() => {
            dispatch(initializedSuccess());
        });
}


export default appReducer;
