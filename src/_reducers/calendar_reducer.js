import { ADD_SCHEDULE, CHANGE_DATE, COM_SCHEDULE, DEL_SCHEDULE, EDIT_SCHEDULE, LOAD_SCHEDULE, NEXT_MONTH, PREV_MONTH, SET_TODAY } from "_actions/types";

const initState = {
    activeD: new Date().getDate(),
    activeM: new Date().getMonth(),
    activeY: new Date().getFullYear(),
    activeS: []
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
        case LOAD_SCHEDULE: {
            // const server = action.data.filter(element => {
            //     const date = element.date.toDate();
            //     if(date.getFullYear() === state.activeY && date.getMonth() === state.activeM) {
            //         return element
            //     } else {
            //         return null
            //     }
            // })
            return {...state, activeS: action.data}
        }
        case EDIT_SCHEDULE:{
            const {id, title, desc} = action;
            return {...state, schedules:[...filtered(id), {...found(id), title, desc}]};
        }
        case ADD_SCHEDULE:{
            return {...state, activeS:[...state.activeS, action.data]};
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