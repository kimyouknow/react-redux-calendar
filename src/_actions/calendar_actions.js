import { fb_db } from "firebaseConfig";
import {CHANGE_DATE, SET_TODAY ,PREV_MONTH, NEXT_MONTH, ADD_SCHEDULE, DEL_SCHEDULE, COM_SCHEDULE, EDIT_SCHEDULE, LOAD_SCHEDULE} from "./types";
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
export const loadSchedule = async() => {
    const response = await db.get()
        .then(docs => docs)
    let data = [];
    response.forEach(doc => {
        if(doc.exists){
            data = [...data, {id: doc.id, ...doc.data()}]
        }
    })
    return {type: LOAD_SCHEDULE, data}
}

export const editSchedule = (id, title, desc) =>{
    return {type:EDIT_SCHEDULE, id, title, desc};
};
export const addSchedule = (data) =>{
    return {type:ADD_SCHEDULE, data};
};
export const delSchedule = (id) =>{
    return {type:DEL_SCHEDULE, id};
};
export const comSchedule = (id) =>{
    return {type:COM_SCHEDULE, id};
};

export const addFB = (date,title,desc) => {
    return function(dispatch){
        let schedule = {
            date,
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