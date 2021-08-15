import { combineReducers } from "redux";
import calendarReducer from "./calendar_reducer";
import userReducer from "./user_reducer";

const rootReducer = combineReducers({
    calendar: calendarReducer,
    user: userReducer
})

export default rootReducer;