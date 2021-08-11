import React from "react";
import styled from "styled-components";
import AddModal from "components/AddModal";
import EditModal from "components/EditModal";
import { connect } from "react-redux";
import { addSchedule, comSchedule, delSchedule, setToday } from "_actions/calendar_actions";
import { compareDate } from "components/Calendar/CalendarCon";
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

const Modal = ({states,setToday, addSchedule,isAdd, openModal, setOpenModal,delSchedule,comSchedule}) => {
    const {calendar: {activeD, activeM, activeY, schedules}} = states;
    const activeDate = new Date(activeY, activeM, activeD);
    const temp = schedules.filter(ele => compareDate(ele.date) === compareDate(activeDate));
    return (
        <Container show={openModal}>
            <ModalWindow>
                <button onClick={() => setOpenModal(false)}>x</button>
                <span>{activeY}</span>/
                <span>{activeM+1}</span>/ 
                <span>{activeD}</span>
                <Datepicker setToday={setToday} />
                {isAdd ?
                    <AddModal setOpenModal={setOpenModal} activeDate={activeDate} addSchedule={addSchedule}/>: 
                    <EditModal setOpenModal={setOpenModal} activeDate={activeDate} temp={temp} delSchedule={delSchedule} comSchedule={comSchedule} />
                }
            </ModalWindow>
        </Container>
    )
}

function mapStateToProps(state, ownProps){
    return {states : state}
}

function mapDispatchToProps(dispatch, ownProps ){
// console.log(ownProps);
return {
    addSchedule: (date, desc) => dispatch(addSchedule(date, desc)),
    setToday: (date) => dispatch(setToday(date)),
    delSchedule: (id) => dispatch(delSchedule(id)),
    comSchedule: (id) => dispatch(comSchedule(id))
}
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);