import React from "react";
import styled from "styled-components";
import { MdChevronLeft, MdChevronRight, } from "react-icons/md";

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
    height: 70px;
    position: relative;
    border: ${props => (props.today ? "3px solid red" : "none")};
    :nth-child(7n+1){
        color: #d13e3e;
    }
    :nth-child(7n){
        color: #396ee2;
    }
`;

const ToDoContainer = styled.div`
    position: absolute;
    bottom: 10px;
    left: 0px;
    width: 100%;
    padding-left: 10px;
    color: black;
    &:hover {
        background-color: rgba(223, 230, 233,1.0);
        cursor: pointer;
    }
`;

const CalendarPre = ({current,weeks ,dates ,handleLastMonth ,handleNextMonth ,handleToday})  => {

return (
    <>
    <Header>
        <Button onClick={() => handleLastMonth(current)}>◀</Button>
            <DisplayMonth onClick={()=> handleToday()}>{`${current.getFullYear()}년 ${current.getMonth()+1}월`}</DisplayMonth>
        <Button onClick={() => handleNextMonth(current)}>▶</Button>
    </Header>
    <WeekContainer>
        {weeks.map(week => <WeekComponent key={week}>{week}</WeekComponent>)}
    </WeekContainer>
    <DateContainer>
            {/* {console.log(dates)} */}
    {!dates ? <h1>Loading</h1> : 
    dates.map(date =>
        <DateComponent key={date.date} today={date.date.getDate() === new Date().getDate() && date.date.getMonth() === new Date().getMonth()} 
        >
            {date.date.getDate()}
            <ToDoContainer>{date.todo}</ToDoContainer>
        </DateComponent>)
    }
    </DateContainer>
</>
);
}

export default CalendarPre;
