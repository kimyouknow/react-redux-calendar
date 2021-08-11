import { combineReducers } from "redux";
import calendarReducer from "./calendar_reducer";

const rootReducer = combineReducers({
    calendar: calendarReducer
})

export default rootReducer;