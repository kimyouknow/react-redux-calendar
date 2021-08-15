import React, { useEffect, useState } from "react"
import CalendarPre from "./CalendarPre"
import { useDispatch, useSelector } from 'react-redux';
import { loadSchedule, nextMonth, prevMonth, setToday } from "_actions/calendar_actions";

const CalendarCon = () => {
    const {calendar} = useSelector((state) => state);
    const dispatch = useDispatch();
    const {activeD, activeM, activeY, activeS} = calendar;
    const [dates, setDates] = useState([]);
    const renderingCalendar = async() => {
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
            // const i_date = new Date(activeY, activeM, i);
            CDates.push({
                date: new Date(activeY, activeM, i),
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

    const handleLastMonth = () => dispatch(prevMonth(activeM));
    const handleNextMonth = () => dispatch(nextMonth(activeM));
    const handleToday = () => dispatch(setToday(new Date()));
    useEffect(() => {
        renderingCalendar();
    }, [activeM, activeD,activeS])
    return (
        <CalendarPre 
            activeDate={{activeD,activeM,activeY}}
            dates={dates}
            activeS={activeS}
            handleLastMonth={handleLastMonth}
            handleNextMonth={handleNextMonth}
            handleToday={handleToday}
        />
    )
}

export default CalendarCon;