import { fb_db } from "firebaseConfig";
import {SET_MODAL, CHANGE_DATE, SET_TODAY ,PREV_MONTH, NEXT_MONTH, ADD_SCHEDULE, DEL_SCHEDULE, COM_SCHEDULE, EDIT_SCHEDULE, LOAD_SCHEDULE} from "./types";
const db = fb_db.collection("calendar");

export const changeDate = (date) =>{
    return {type: CHANGE_DATE, date};
};
export const setToday = (date) =>{
    return {type: SET_TODAY, date};
};
export const prevMonth = (thisMonth) =>{
    return {type:PREV_MONTH, thisMonth};
};
export const nextMonth = (thisMonth) =>{
    return {type:NEXT_MONTH, thisMonth};
};
export const setModal = (text) => {
    return {type:SET_MODAL, text}
}

export const loadSchedule = async(uid) => {
    const response = await db.get()
        .then(docs => docs)
    let data = [];
    response.forEach(doc => {
        if(doc.exists && doc.data().uid === uid){
            data = [...data, {id: doc.id, ...doc.data()}]
        }
    })
    return {type: LOAD_SCHEDULE, data}
}

export const addSchedule = (data) =>{
    return {type:ADD_SCHEDULE, data};
};
export const delSchedule = (id) =>{
    return {type:DEL_SCHEDULE, id};
};
export const comSchedule = (id, completed) =>{
    return {type:COM_SCHEDULE, id, completed};
};
export const editSchedule = (id, title, desc) =>{
    return {type:EDIT_SCHEDULE, id, title, desc};
};

export const addFB = (uid, date,title,desc) => {
    return function(dispatch){
        let schedule = {
            uid,
            date: String(date),
            desc,
            title,
            completed: false
        }
        db.add(schedule).then((docRef) => {
            schedule = {...schedule, id: docRef.id}
            dispatch(addSchedule(schedule))
        })
    }
}

export const delFB = (id) => {
    return async function(dispatch){
        await fb_db.doc(`calendar/${id}`).delete();
        dispatch(delSchedule(id))
    }
}

export const comFB = (id, completed) => {
    return async function(dispatch){
        await fb_db.doc(`calendar/${id}`).update({
            completed: !completed
        });
        dispatch(comSchedule(id, !completed))
    }
}

export const editFB = (id, title, desc) => {
    return async function(dispatch){
        await fb_db.doc(`calendar/${id}`).update({
            title,
            desc
        });
        dispatch(editSchedule(id, title, desc))
    }
}