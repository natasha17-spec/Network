const UPDATE_NEW_MESSAGE_BODY = 'samurai-network/dialogs/UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'samurai-network/dialogs/SEND_MESSAGE';

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
        {id: 5, message: 'You is cool!'}
    ]

};
 const dialogsReducer = (state = inicialState, action) => {

     switch (action.type) {
         case SEND_MESSAGE:
             let body = action.newMessageBody;
             return {
                 ...state,
                 messagesData: [...state.messagesData,
                     {id: 6, message: body}],
                 };
             default:
             return state;
     }
 };
export  const sendMessageCreator =(newMessageBody) =>
    ({type: SEND_MESSAGE, newMessageBody});
export  const updateNewMessageBodyCreator =(body) =>
    ({type: UPDATE_NEW_MESSAGE_BODY, body: body});

export default dialogsReducer;