import profileReducer from "./profileReducer";
import dialogsReducer from "./DialogsReducer";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';



let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'I am fine!', likesCount: 45},
                {id: 2, message: 'Hey! How are you?', likesCount: 23}
            ],
            newPostText: 'it-kamasutra.com'
        },
        dialogsPage: {
            dialogsData: [
                {id: 1, name: 'Natasha'},
                {id: 2, name: 'Sveta'},
                {id: 3, name: 'Masha'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Vlad'},
                {id: 6, name: 'Vlad'}
            ],

            messagesData: [
                {id: 1, message: 'Hi!'},
                {id: 2, message: 'How is your it-kamasutra?'},
                {id: 3, message: 'Where are you?!'},
                {id: 4, message: 'You is cool!'},
                {id: 5, message: 'You is cool!'},
            ],
            newMessageBody: ""
        },
        navBar: [
            {title: 'Андрей'},
            {title: 'Володя'},
            {title: 'Света'}
        ]
    },

    _callSubscriber() {
        console.log('state changed');
    },

    getState(){
        return this._state;
    },

    subscribe(observer){
        this._callSubscriber= observer;
    },


    dispatch(action){
        profileReducer(this._state.profilePage, action);
        dialogsReducer(this._state.dialogsPage, action);
        this._callSubscriber(this._state);
        }

    }

export  const addPostActionCreator =() =>  ({type: ADD_POST});
export  const updateNewPostActionCreator =(text) =>
    ({type: UPDATE_NEW_POST_TEXT, newText: text});

export  const sendMessageCreator =() =>  ({type: SEND_MESSAGE});
export  const updateNewMessageBodyCreator =(body) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: body});


        export default store;
        window.store = store;


