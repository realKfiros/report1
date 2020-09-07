const userReducer = (state = {}, { type, user }) => {
    switch(type) {
        case 'SIGN-IN':
            return {
                ...state,
                user
            }
        case 'SIGN-OUT':
            return {
                user: undefined
            }
        default:
            return state;
    }
}

export default userReducer;