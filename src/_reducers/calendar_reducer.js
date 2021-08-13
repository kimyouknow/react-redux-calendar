import { v4 as uuidv4 } from 'uuid';
import { ADD_SCHEDULE, CHANGE_DATE, COM_SCHEDULE, DEL_SCHEDULE, EDIT_SCHEDULE, NEXT_MONTH, PREV_MONTH, SET_TODAY } from "_actions/types";

const initState = {
    activeD: new Date().getDate(),
    activeM: new Date().getMonth(),
    activeY: new Date().getFullYear(),
    schedules: [
        {id: uuidv4(), date: new Date(2021, 7,22),title: "심야디버깅", desc:"심야 디버깅", completed:false},
        {id: uuidv4(), date: new Date(2021, 7,2),title: "찌미", desc:"도리 쓰다듬기", completed:false},
        {id: uuidv4(), date: new Date(2021, 7,12),title: "띵동", desc:"캘린더 사용하기", completed:false},
        {id: uuidv4(), date: new Date(2021, 7,22),title: "코딩", desc:"코딩", completed:false}
    ]
}

const calendarReducer = (state = initState, action) => {
    const found = (id) => state.schedules.find(element =>  String(element.id) === String(id));
    const filtered = (id) => state.schedules.filter(element =>  String(element.id) !== String(id));
    switch (action.type){
        case CHANGE_DATE:{
            const newDate = new Date(action.date);
            return {...state, activeD: newDate.getDate()};
        }
        case SET_TODAY:{
            const newDate = action.date;
            return {...state, activeD: newDate.getDate(), activeM: newDate.getMonth(), activeY: newDate.getFullYear()};
        }
        case PREV_MONTH:{
            let newM = state.activeM -1;
            let newY = state.activeY;
            let newD = new Date(newY, newM, 1).getDate();
            if(state.activeM === 1){
                newM =  state.activeM+11;
                newY = state.activeY-1;
                newD = new Date(newY, newM, 1).getDate();
                return {...state, activeD: newD,activeM: newM, activeY:newY }
            } return {...state,activeD: newD, activeM:newM}
        }
        case NEXT_MONTH:{
            let newM = state.activeM +1;
            let newY = state.activeY;
            let newD = new Date(newY, newM, 1).getDate();
            if(state.activeM===12){
                newM =  state.activeM-11;
                newY = state.activeY+1;
                newD = new Date(newY, newM, 1).getDate();
                return {...state, activeD: newD,activeM: newM, activeY:newY }
            } return {...state,activeD: newD, activeM:newM}
        }
        case EDIT_SCHEDULE:{
            const {id, title, desc} = action;
            return {...state, schedules:[...filtered(id), {...found(id), title, desc}]};
        }
        case ADD_SCHEDULE:{
            return {...state, schedules:[...state.schedules,{id: uuidv4(), date:action.date,title:action.title, desc:action.desc, completed:false}]};
        }
        case DEL_SCHEDULE:{
            return {...state, schedules:filtered};
        }
        case COM_SCHEDULE:{
            return {...state, schedules:[...filtered(action.id), {...found(action.id), completed: true}]};
        }
        default:
            return state;
    }
}

export default calendarReducer;