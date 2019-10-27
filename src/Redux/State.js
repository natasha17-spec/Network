        let state = {
            profilePage: {
                posts: [
                    {id: 1, message: 'I am fine!', likesCount: 45},
                    {id: 2, message: 'Hey! How are you?', likesCount: 23}
                ]
            },

            dialogsPage: {
                messagesData: [
                    {id: 1, message: 'Hi!'},
                    {id: 2, message: 'How is your it-kamasutra?'},
                    {id: 3, message: 'Where are you?!'},
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
export let addPost = (postMessage) =>{

let newPosts = {
    id: 5,
    message: postMessage,
    likesCount: 0
    };
    state.profilePage.posts.push(newPosts);
};





        export default state


