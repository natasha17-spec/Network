const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let inicialState ={
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
};
 const dialogsReducer = (state = inicialState, action) => {


     let stateCopy;

     switch (action.type) {
         case UPDATE_NEW_MESSAGE_BODY:
             stateCopy={
                 ...state,
                 newMessageBody: action.body

             };
             return stateCopy;

         case SEND_MESSAGE:
             let body = state.newMessageBody;
             stateCopy={
                 ...state,
                 newMessageBody: '',
                 messagesData: [...state.messagesData,{id: 6, message: body}],
                 };
             return stateCopy;
         default:
             return state;
     }
 };
export  const sendMessageCreator =() =>  ({type: SEND_MESSAGE});
export  const updateNewMessageBodyCreator =(body) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: body});

export default dialogsReducer;