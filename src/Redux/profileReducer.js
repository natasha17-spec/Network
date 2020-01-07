const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';

let inicialState = {
    posts: [
        {id: 1, message: 'I am fine!', likesCount: 45},
        {id: 2, message: 'Hey! How are you?', likesCount: 23}
    ],
    newPostText: 'it-kamasutra.com',
    profile: null
};

const profileReducer = (state = inicialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPosts = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            };


            return {
                ...state,
                posts: [...state.posts, newPosts],
                newPostText: ''
            };
        }
        case UPDATE_NEW_POST_TEXT: {
            return {
                ...state,
                newPostText: action.newText
            };
        }
        case SET_USERS_PROFILE: {

            return {...state, profile: action.profile};
        }
        default:
            return state
    }
};
export  const addPostActionCreator =() =>  ({type: ADD_POST});
export  const setUserProfile =(profile) =>  ({type: SET_USERS_PROFILE, profile});
export  const updateNewPostActionCreator =(text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});

export default profileReducer;