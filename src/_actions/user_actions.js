import { REFRESH_USER, SET_USER, UPDATE } from "./types"
import { fb_auth } from "firebaseConfig"

export const setUser = (user) => {
    return {type: SET_USER, user}
}

export const update = (user) => {
    return {type: UPDATE, user}
}

export const refreshUser = () => {
    const user = fb_auth.currentUser;  
    return {type: REFRESH_USER, user}
}

export const updatefb = (newDisplayName) => {
    return async function (dispatch){
        const user = fb_auth.currentUser;  
        await user.updateProfile({
            displayName: newDisplayName
        })
        dispatch(update(user))
    }   
}

export const setUserFB = () => {
    return function(dispatch){
        fb_auth.onAuthStateChanged(user => {
            let userObj;
            if(user) {
                if(user.displayName === null){
                    const ind = user.email.indexOf("@")
                    const end = user.email.substring(0,ind)
                    user.updateProfile({displayName:end})
                }
                userObj = {
                    displayName: user.displayName,
                    uid: user.uid
                };
                return dispatch(setUser(userObj))
            } else {
                userObj = null
                return dispatch(setUser(userObj))
            }
            });
        
    }
}
