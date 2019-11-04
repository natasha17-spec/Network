import {rerenderEntireTree} from "../render";

let state = {
            profilePage: {
                posts: [
                    {id: 1, message: 'I am fine!', likesCount: 45},
                    {id: 2, message: 'Hey! How are you?', likesCount: 23}
                ],
                newPostText: 'it-kamasutra.com'
            },
            dialogsPage: {
                messagesData: [
                    {id: 1, message: 'Hi!'},
                    {id: 2, message: 'How is your it-kamasutra?'},
                    {id: 3, message: 'Where are you?!'},
                    {id: 4, message: 'You is cool!'},
                    {id: 4, message: 'You is cool!'},
                    {id: 4, message: 'You is cool!'},
                ],
                dialogsData: [
                    {id: 1, name: 'Natasha'},
                    {id: 2, name: 'Sveta'},
                    {id: 3, name: 'Masha'},
                    {id: 4, name: 'Sasha'},
                    {id: 5, name: 'Vlad'},
                    {id: 6, name: 'Ola'}
                ],
            },
            navBar: [
                            {title: 'Андрей'},
                            {title: 'Володя'},
                            {title: 'Света'}
                        ]
        };

export let addPost = () =>{
let newPosts = {
    id: 5,
    message: state.profilePage.newPostText,
    likesCount: 0
    };
    state.profilePage.posts.push(newPosts);
 rerenderEntireTree(state)
};
export let apdateNewPostText = (newText) =>{
    state.profilePage.newPostText=newText;
 rerenderEntireTree(state)
};
        export default state;


