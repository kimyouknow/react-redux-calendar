import React, { useState } from "react";
import styled from "styled-components";

const PlanUl = styled.ul``;
const PlanLi = styled.li`
    display:flex;
`;

const ToDoElement = styled.div`
    /* text-decoration: ${props => props.isCom ? "line-through" : "none"}; */
    :hover{
    -webkit-transform:scale(1.2);
    }
`;

const EditModal = ({setOpenModal ,activeDate ,temp, delSchedule, comSchedule}) => {
    const [planInput, setPlanInput] = useState("");
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // 
        setPlanInput("");
        setOpenModal(false);
    }
    return (
        <>
        <form onSubmit={(e => onSubmitHandler(e))}>
            <label>Edit to do</label>
            <input type="text" value={planInput} onChange={(e => setPlanInput(e.target.value))} />
        </form>
        <PlanUl>
            {!temp ? <span>계획된 일정이 없습니다</span> : 
                temp.map(schedule => 
                <PlanLi key={schedule.id}>
                    <span>{schedule.desc}</span>
                    <span>{String(schedule.completed)}</span>
                    <ToDoElement onClick={() => comSchedule(schedule.id)}>✅</ToDoElement>
                    <ToDoElement onClick={() => delSchedule(schedule.id)}>❌</ToDoElement>
                </PlanLi>)
            }
        </PlanUl>
        </>
    )
}

export default EditModal;