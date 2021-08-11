import { v4 as uuidv4 } from 'uuid';
import { ADD_SCHEDULE, CHANGE_DATE, COM_SCHEDULE, DEL_SCHEDULE, LOAD_DATE, LOAD_SCHEDULE, NEXT_MONTH, PREV_MONTH, SET_TODAY } from "_actions/types";

const initState = {
    activeD: new Date().getDate(),
    activeM: new Date().getMonth(),
    activeY: new Date().getFullYear(),
    schedules: [
        {id: uuidv4(), date: new Date(2021, 7,22), desc:"심야 디버깅", completed:false},
        {id: uuidv4(), date: new Date(2021, 7,2), desc:"도리 쓰다듬기", completed:false},
        {id: uuidv4(), date: new Date(2021, 7,12), desc:"캘린더 사용하기", completed:false},
        {id: uuidv4(), date: new Date(2021, 7,22), desc:"코딩", completed:false}
    ]
}

const calendarReducer = (state = initState, action) => {
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
        case LOAD_SCHEDULE:{
            console.log(action);
            const filtered =  state.schedules.filter(element =>  String(element.id) !== String(action.id));
            return {...state};
        }
        case ADD_SCHEDULE:{
            return {...state, schedules:[...state.schedules,{id: uuidv4(), date:action.date, desc:action.desc, completed:false}]};
        }
        case DEL_SCHEDULE:{
            const filtered =  state.schedules.filter(element =>  String(element.id) !== String(action.id));
            return {...state, schedules:filtered};
        }
        case COM_SCHEDULE:{
            const filtered =  state.schedules.filter(element =>  String(element.id) !== String(action.id));
            const found =  state.schedules.find(element =>  String(element.id) === String(action.id));
            return {...state, schedules:[...filtered, {...found, completed: true}]};
        }
        default:
            return state;
    }
}

export default calendarReducer;