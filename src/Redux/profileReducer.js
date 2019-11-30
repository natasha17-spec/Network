const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let inicialState = {
    posts: [
        {id: 1, message: 'I am fine!', likesCount: 45},
        {id: 2, message: 'Hey! How are you?', likesCount: 23}
    ],
    newPostText: 'it-kamasutra.com'
};

 const profileReducer = (state = inicialState, action) =>{
     switch (action.type) {
         case ADD_POST:
             let newPosts = {
                 id: 5,
                 message: state.newPostText,
                 likesCount: 0
             };
             state.posts.push(newPosts);
             state.newPostText = '';
             return state;
         case UPDATE_NEW_POST_TEXT:
             state.newPostText = action.newText;

             return state;
         default:
             return state
     }
};
export  const addPostActionCreator =() =>  ({type: ADD_POST});
export  const updateNewPostActionCreator =(text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});

export default profileReducer;