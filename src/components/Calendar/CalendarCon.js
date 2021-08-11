import React, { useEffect, useState } from "react"
import CalendarPre from "./CalendarPre"
import { connect } from "react-redux";
import { changeDate, nextMonth, prevMonth, setToday } from "_actions/calendar_actions";

export const compareDate = (input) => {
    const inputY = String(input.getFullYear());
    const inputM = String(input.getMonth());
    const inputD = String(input.getDate());
    return inputY+inputM+inputD
}

const CalendarCon = ({states,
    changeDate,
    preMonth,
    nextMonth,
    setToday}) => {
    const {calendar: {activeD, activeM, activeY, schedules}} = states;
    const [dates, setDates] = useState([]);
    const renderingCalendar = () => {
        const preLast = new Date(activeY, activeM, 0);
        const currentLast = new Date(activeY, activeM+1, 0);
        const PLDate = preLast.getDate();
        const PLDay = preLast.getDay();
        const CLDate = currentLast.getDate();
        const CLDay = currentLast.getDay();
        const PDates = [];
        const CDates = [];
        const NDates = [];
        for(let i = 1; i < CLDate+1; i++ ){
            const i_date = new Date(activeY, activeM, i);
            const i_schedule = schedules.filter((obj => compareDate(obj.date) === compareDate(i_date)));
            CDates.push({
                date: new Date(activeY, activeM, i),
                schedules: i_schedule,
                isCur: true
            });
        }
        // Sunday - Saturday : 0 - 6
        if (PLDay !== 6){
            for (let i = PLDay; i >= 0; i--){
                PDates.push({
                    date: new Date(activeY, activeM-1, PLDate-i),
                    isCur: false
                });
            }
        }
        if (CLDay !== 6) {
            for (let i = 1; i <= 6-CLDay; i++){
                NDates.push({
                    date: new Date(activeY, activeM+1, i),
                    isCur: false
                });
            }
        }
        setDates(PDates.concat(CDates, NDates));
    }
    const onClick = (date) => changeDate(date);
    const handleLastMonth = () => preMonth(activeM);
    const handleNextMonth = () => nextMonth(activeM);
    const handleToday = () => setToday(new Date());
    useEffect(() => {
        renderingCalendar();
    }, [states])
    return (
        <CalendarPre 
            activeDate={
                {activeD,activeM,activeY}
            }
            dates={dates}
            handleLastMonth={handleLastMonth}
            handleNextMonth={handleNextMonth}
            handleToday={handleToday}
            onClick={onClick}
        />
    )
}

function mapStateToProps(state, ownProps){
    return {states : state}
}

// dispatch를 home components에서 사용하지 않고 function과 props를 만들고, 그 fns를 props로 전달
function mapDispatchToProps(dispatch, ownProps ){
    // console.log(ownProps);
    return {
        changeDate: (date) => dispatch(changeDate(date)),
        preMonth: (thisMonth) => dispatch(prevMonth(thisMonth)),
        nextMonth: (thisMonth) => dispatch(nextMonth(thisMonth)),
        setToday: (date) => dispatch(setToday(date))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarCon);