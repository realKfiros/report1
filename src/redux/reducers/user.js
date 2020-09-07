const userReducer = (state = {}, { type, name }) => {
    switch(type) {
        case 'SIGN-IN':
            return {
                ...state,
                name
            }
        case 'SIGN-OUT':
            return {
                name: undefined
            }
        default:
            return state;
    }
}

export default userReducer;