import React, { useState } from "react";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import { addFB } from "_actions/calendar_actions";

const Container = styled.div`
    display: ${props => props.show ? "flex" : "none"};
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    left: 0;
    top: 0;
    font-size: 50px;
`;

const ModalWindow = styled.div`
    width: 500px;
    height: 500px;
    border-radius: 10px;
    background-color: #fff;
`;

const Modal = ({openModal, setOpenModal}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [activeDate, setActiveDate] = useState(new Date());
    const onChangeHandler = (value) => {
        const Y = Number(value.slice(0,4))
        const M = Number(value.slice(5,7))-1
        const D = Number(value.slice(8,10))
        setActiveDate(new Date(Y,M,D));
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // console.log(activeDate)
        dispatch(addFB(activeDate, title, desc));
        setTitle("");
        setDesc("")
        setOpenModal(false);
    }
    // const temp = schedules.filter(ele => compareDate(ele.date) === compareDate(activeDate));
    if (openModal){
        window.addEventListener("keydown", (e) => e.keyCode === 27 ? setOpenModal(false): null);
    }
    return (
        <Container show={openModal}>
            <ModalWindow>
                <button onClick={() => setOpenModal(false)}>x</button>
                <input type="date" onChange={(e) => onChangeHandler(e.target.value)} />
                <form onSubmit={(e => onSubmitHandler(e))}>
                    <label>Add to do</label>
                    <input type="text" name="title" value={title} onChange={(e => setTitle(e.target.value))} placeholder="Title" />
                    <input type="text" name="desc" value={desc} onChange={(e => setDesc(e.target.value))} placeholder="Description" />
                    <button type="submit">submit</button>
                </form>
            </ModalWindow>
        </Container>
    )
}
export default Modal;