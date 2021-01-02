import usersReducer, {actions, InitialState} from "./UsersReducer";


let state: InitialState
beforeEach(() => {
    state = {
        users: [{
            id: 0,
            name: "sdjfjs",
            followed: false,
            status: 'sdf',
            photos: {
                small: null, large: null
            }
        },
            {
                id: 1,
                name: "erg",
                followed: false,
                status: 'gbb',
                photos: {
                    small: null, large: null
                }
            },
            {
                id: 2,
                name: "eg",
                followed: false,
                status: 'sdf',
                photos: {
                    small: null, large: null
                }
            },
            {
                id: 3,
                name: "sdjfjs",
                followed: true,
                status: 'rtert',
                photos: {
                    small: null, large: null
                }
            },
        ],
        pageSize: 15,
        totalUsersCount: 28,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})
test('follow user', () => {
    let follow = usersReducer(state,actions.followSuccess(2))
    expect(follow.users[0].followed).toBeFalsy()
    expect(follow.users[2].followed).toBeTruthy()
})
test('unfollow user', () => {
    let follow = usersReducer(state,actions.unfollowSuccess(3))
    expect(follow.users[1].followed).toBeFalsy()
    expect(follow.users[3].followed).toBeFalsy()
})