import Calendar from "components/Calendar/CalendarCon";
import React, {useState} from "react";
import { connect } from "react-redux";
import { addSchedule } from "_actions/calendar_actions";
import styled from "styled-components";
import Modal from "display/Modal";

function Home({states, addSchedule}) {
  const {calendar: {schedules}} = states;
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => !openModal ? setOpenModal(true) : setOpenModal(false);
  return (
    <>
        <Calendar />
        <button onClick={()=> handleModal()}>ADD</button>
        <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

function mapStateToProps(state, ownProps){
  return {states : state}
}

function mapDispatchToProps(dispatch, ownProps ){
  // console.log(ownProps);
  return {
    addSchedule: (date, desc) => dispatch(addSchedule(date, desc)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
