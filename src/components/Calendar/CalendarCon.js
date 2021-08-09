import React, { useEffect, useState } from "react"
import CalendarPre from "./CalendarPre"
import { getRenderBase, renderCalendar } from "./renderCalendar";

const CalendarCon = () => {
    const [current, setCurrent] = useState(new Date());
    const [dates, setDates] = useState([]);
    const weeks = ["SUN", "MON","TUE","WED","THU","FRI","SAT"];
    const renderingCalendar = async() => {
        const {renderYear, renderMonth} = await getRenderBase(current);
        const dates = renderCalendar(renderYear, renderMonth);
        setDates(dates);
    }
    const handleLastMonth = (current) => {    
        const newMonth = new Date(current.setMonth(current.getMonth() - 1));
        const newDate = new Date(newMonth.setDate(1));
        setCurrent(newDate);
    }
    
    const handleNextMonth = (current) => {
        const newMonth = new Date(current.setMonth(current.getMonth() + 1));
        const newDate =new Date(newMonth.setDate(1));
        setCurrent(newDate);
    }
    
    const handleToday = () => {
        setCurrent(new Date());
    }
    useEffect(() => {
        renderingCalendar();
    }, [current])
    // console.log(dates);
    return (
        <CalendarPre 
            current={current}
            weeks={weeks}
            dates={dates}
            handleLastMonth={handleLastMonth}
            handleNextMonth={handleNextMonth}
            handleToday={handleToday}
        />
    )
}

export default CalendarCon