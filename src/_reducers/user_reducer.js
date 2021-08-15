import {  REFRESH_USER, SET_USER, UPDATE } from "_actions/types";


const initState = {
    user: null
}

const userReducer = (state= initState, action) => {
    switch (action.type) {
        case SET_USER:
            return {user: action.user}
        case REFRESH_USER:
            const refresh = {
                ...state.user,
                displayName: action.user.displayName,
                uid: action.user.uid,
            }
            return {user: refresh}
        case UPDATE:
            // console.log(action.user.displayName)
            const updated = {
                ...state.user,
                displayName: action.user.displayName
            }
            // console.log(updated)
            return {user:updated}
        default:
            return state;
    }
}
export default userReducer;