import EditModal from "components/EditModal";
import React, { useState } from "react";
import styled from "styled-components";
// import { MdChevronLeft, MdChevronRight, } from "react-icons/md";

const Header = styled.div`
    display: flex;
    justify-content:center;
    margin-bottom: 20px;
`;

const WeekContainer =styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
`;

const WeekComponent = styled.div`
    display: flex;
    justify-content:center;
    align-items: center;
    height: 70px;
    :nth-child(7n+1){
        color: #d13e3e;
    }
    :nth-child(7n){
        color: #396ee2;
    }
`;

const DisplayMonth = styled.div`
    &:hover{
        cursor: pointer;
    }
`;

const Button = styled.div`
    &:hover{
        cursor: pointer;
    }
`;

const DateContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 20px;
`;

const DateComponent = styled.div`
    display: flex;
    justify-content:flex-start;
    align-items: flex-start;
    padding: 8px;
    height: 100px;
    position: relative;
    border: ${props => (props.today ? "3px solid red" : "none")};
    background-color: ${props => props.isCur ? "transparent": "rgba(0,0,0,0.2)"};
    :nth-child(7n+1){
        color: #d13e3e;
    };
    :nth-child(7n){
        color: #396ee2;
    };
    cursor: pointer;
`;

const ToDoContainer = styled.div`
    display: flex;
    flex-direction:column;
    width: 100%;
    padding-left: 10px;
    color: black;
    &:hover {
        background-color: rgba(223, 230, 233,1.0);
    }
`;

const CalendarPre = ({activeDate, dates, activeS, handleLastMonth, handleNextMonth, handleToday})  => {
    const weeks = ["SUN", "MON","TUE","WED","THU","FRI","SAT"];    
    const {activeM,activeY} = activeDate;
    const [activeInfo, setActiveInfo] = useState(null);
    const compareDate = (input) => {
        const inputY = String(input.getFullYear());
        const inputM = String(input.getMonth());
        const inputD = String(input.getDate());
        return inputY+inputM+inputD
    }
    const filterd = (date) => activeS.filter(obj => compareDate(obj.date) === compareDate(date.date))
    return (
        <>
        <Header>
            <Button onClick={() => handleLastMonth()}>◀</Button>
                <DisplayMonth onClick={()=> handleToday()}>
                    {activeY}년 {activeM+1}월
                </DisplayMonth>
            <Button onClick={() => handleNextMonth()}>▶</Button>
        </Header>
        <WeekContainer>
            {weeks.map(week => <WeekComponent key={week}>{week}</WeekComponent>)}
        </WeekContainer>
        <DateContainer>
            {/* {console.log(dates)} */}
            {!dates ? <h1>Loading</h1> : 
            dates.map(date =>
                <DateComponent key={date.date} 
                    isCur={date.isCur}
                    today={date.date.getDate() === new Date().getDate() && date.date.getMonth() === new Date().getMonth()}
                >
                {date.date.getDate()}
                <ToDoContainer>
                    {filterd(date) ? filterd(date).map((ele, idx) => 
                        <ToDoContainer key={idx} onClick={()=> setActiveInfo(ele)}>
                            {ele.title}
                        </ToDoContainer>
                    ): null}
                </ToDoContainer>
            </DateComponent>)
        }
        </DateContainer>
        {activeInfo && <EditModal 
            activeInfo={activeInfo}
            setActiveInfo={setActiveInfo}
        />}
    </>
    );
}

export default CalendarPre;


// const {data:schedules} = await dispatch(loadSchedule());
//         const i_schedule = schedules.filter((obj => compareDate(obj.date.toDate()) === compareDate(i_date)));