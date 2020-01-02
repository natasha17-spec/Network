const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let inicialState = {
    users: [
        // {
        //     id: 1,
        //     photoUrl: 'https://st.depositphotos.com/1898481/3917/i/950/depositphotos_39179105-stock-photo-silhouette.jpg',
        //     followed: false,
        //     fullname: 'Natali Gerasimovich',
        //     status: 'I am a boss',
        //     location: {city: 'Minsk', country: 'Belarus'}
        // },
        // {
        //     id: 2,
        //     photoUrl: 'https://st.depositphotos.com/1898481/3917/i/950/depositphotos_39179105-stock-photo-silhouette.jpg',
        //     followed: true,
        //     fullname: 'Ivan Petrov',
        //     status: 'I am a doctor',
        //     location: {city: 'Moskov', country: 'Russia'}
        // },
        // {
        //     id: 3,
        //     photoUrl: 'https://st.depositphotos.com/1898481/3917/i/950/depositphotos_39179105-stock-photo-silhouette.jpg',
        //     followed: true,
        //     fullname: 'Dmitiy Sidorov',
        //     status: 'I am a devoloper',
        //     location: {city: 'Minsk', country: 'Belarus'}
        // },
        // {
        //     id: 4,
        //     photoUrl: 'https://st.depositphotos.com/1898481/3917/i/950/depositphotos_39179105-stock-photo-silhouette.jpg',
        //     followed: false,
        //     fullname: 'Katya Marinka',
        //     status: 'I am a teacher',
        //     location: {city: 'Minsk', country: 'Belarus'}
        // }
    ],
};

const usersReducer = (state = inicialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => { //00.26
                    if (u.id === action.UserId) {
                        return {...u, followed: true}
                    }
                    return u;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.UserId) {
                        return {...u, followed: false}
                    }
                    return u;
                })
            };
        case SET_USERS:
            return {...state, users: [...state.users, ...action.users]};
        default:
            return state
    }
};


export const followAC = (UserId) => ({type: FOLLOW, UserId});
export const unfollowAC = (UserId) => ({type: UNFOLLOW, UserId});
export const setUsersAC = (users) => ({type: SET_USERS, users});

export default usersReducer;