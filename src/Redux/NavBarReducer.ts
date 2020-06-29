type InitialStateType = {
    navBar: Array<{title: string}>
}

let initialState:InitialStateType = {
    navBar: [
        {title: 'Андрей'},
        {title: 'Володя'},
        {title: 'Света'}
    ]
};

const navBarReducer = (state = initialState, action:any) => {

    return state;
};
export default navBarReducer;