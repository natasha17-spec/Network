const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const FULLNAME_PROFILE ='FULLNAME_PROFILE';
const ABOUTME_PROFILE ='ABOUTME_PROFILE';
const LOOKING_FOR_A_JOB ='LOOKING_FOR_A_JOB';
const LOOKING_FOR_A_JOB_DESCRIPTION ='LOOKING_FOR_A_JOB_DESCRIPTION';


let inicialState = {
    posts: [
        {id: 1, message: 'I am fine!', likesCount: 45},
        {id: 2, message: 'Hey! How are you?', likesCount: 23}
    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    fullName:null,
    aboutMe:null,
    lookingForAJob:null,
    lookingForAJobDescription:null
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
        case FULLNAME_PROFILE: {

            return {...state, fullName: action.fullName};
        }
        case ABOUTME_PROFILE: {

            return {...state, aboutMe: action.aboutMe};
        }
        case LOOKING_FOR_A_JOB: {

            return {...state, lookingForAJob: action.lookingForAJob};
        }
        case LOOKING_FOR_A_JOB_DESCRIPTION: {

            return {...state, lookingForAJobDescription: action.lookingForAJobDescription};
        }
        default:
            return state
    }
};
export  const addPostActionCreator =() =>  ({type: ADD_POST});
export  const setUserProfile =(profile) =>  ({type: SET_USERS_PROFILE, profile});
export  const setFullnameProfile =(fullName) =>  ({type: FULLNAME_PROFILE, fullName});
export  const setAboutMeProfile =(aboutMe) =>  ({type: ABOUTME_PROFILE, aboutMe});
export  const setlookingForAJobProfile =(lookingForAJob) =>  ({type: LOOKING_FOR_A_JOB, lookingForAJob});
export  const setlookingForAJobDescriptionProfile =(lookingForAJobDescription) =>  ({type: LOOKING_FOR_A_JOB_DESCRIPTION, lookingForAJobDescription});
export  const updateNewPostActionCreator =(text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});

export default profileReducer;