const SEND_MESSAGE = 'samurai-network/dialogs/SEND_MESSAGE';

type InitialStateType = {
    dialogsData: Array<{ id: number, name: string }>,
    messagesData: Array<{ id: number, message: string }>,
}

let initialState: InitialStateType= {
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
const dialogsReducer = (state = initialState, action: any):InitialStateType => {

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
//*Action creators type
type SendMessageCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBody: string
}
//*Action creators
export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorType =>
    ({type: SEND_MESSAGE, newMessageBody});
export default dialogsReducer;