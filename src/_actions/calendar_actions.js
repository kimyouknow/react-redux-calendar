export const createCalendar = (calendar) => {
    return (dispatch, getState) => {
        // make async call to database
        dispatch({type: "CREATE_CALENDAR", calendar});
    }
}