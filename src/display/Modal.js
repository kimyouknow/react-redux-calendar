import React, { useState } from "react";
import {useDispatch} from "react-redux";
import styled from "styled-components";
import { connect } from "react-redux";
import { addSchedule } from "_actions/calendar_actions";
import Datepicker from "components/datePicker";

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

const Modal = ({states,openModal, setOpenModal}) => {
    const {calendar: {activeD, activeM, activeY}} = states;
    const dispatch = useDispatch();
    const activeDate = new Date(activeY, activeM, activeD);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const onSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(addSchedule(activeDate, title, desc));
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
                <Datepicker/>
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

function mapStateToProps(state, ownProps){
    return {states : state}
}

export default connect(mapStateToProps, null)(Modal);