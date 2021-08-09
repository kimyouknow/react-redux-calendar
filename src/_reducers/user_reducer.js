const initState = {}

const LOGIN = "login";

const fbLogin = (user) => {
    return {
        type: LOGIN,
        user
    }
}

const authReducer = (state=initState, action) => {
    switch(action.type){
        case LOGIN:
            return 
        default:
            return state
        
    }
}
export default authReducer;


