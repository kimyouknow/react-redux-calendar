import React, { useState } from "react";
import styled from "styled-components";

const AddModal = ({setOpenModal,activeDate, addSchedule}) => {
    const [planInput, setPlanInput] = useState("");
    const onSubmitHandler = (e) => {
        e.preventDefault();
        addSchedule(activeDate, planInput);
        setPlanInput("");
        setOpenModal(false);
    }
    return (
        <>
        <form onSubmit={(e => onSubmitHandler(e))}>
            <label>Add to do</label>
            <input type="text" value={planInput} onChange={(e => setPlanInput(e.target.value))} />
            <button type="submit">submit</button>
        </form>
        </>
    )
}

export default AddModal;