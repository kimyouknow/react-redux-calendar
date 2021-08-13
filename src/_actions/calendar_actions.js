import {CHANGE_DATE, SET_TODAY ,PREV_MONTH, NEXT_MONTH, ADD_SCHEDULE, DEL_SCHEDULE, COM_SCHEDULE, EDIT_SCHEDULE} from "./types";

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

export const editSchedule = (id, title, desc) =>{
    return {type:EDIT_SCHEDULE, id, title, desc};
};
export const addSchedule = (date,title,desc) =>{
    return {type:ADD_SCHEDULE, date, title, desc};
};
export const delSchedule = (id) =>{
    return {type:DEL_SCHEDULE, id};
};
export const comSchedule = (id) =>{
    return {type:COM_SCHEDULE, id};
};