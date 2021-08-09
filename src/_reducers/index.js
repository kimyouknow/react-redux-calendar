import { combineReducers } from "redux";
import authReducer from "./user_reducer";
import calendarReducer from "./calendar_reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    calendar: calendarReducer
})

export default rootReducer;