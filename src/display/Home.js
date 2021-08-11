import Calendar from "components/Calendar/CalendarCon";
import React, {useState} from "react";
import { connect } from "react-redux";
import { addSchedule } from "_actions/calendar_actions";
import styled from "styled-components";
import Modal from "display/Modal";

const PlanContainer = styled.div``;

const PlanUl = styled.ul``;
const PlanLi = styled.li``;


function Home({states, addSchedule}) {
  const {calendar: {activeD, activeM, activeY, schedules}} = states;
  const [planInput, setPlanInput] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isAdd, setIsAdd] = useState(true);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const activeDate = new Date(activeY, activeM, activeD);
    addSchedule(activeDate, planInput);
    setPlanInput("")
  }
  const handleModal = (type) => {
    console.log(openModal);
    !openModal ? setOpenModal(true) : setOpenModal(false);
    type === "add" ? setIsAdd(true) : setIsAdd(false);
  }
  return (
    <>
        <Calendar />
        <form onSubmit={(e => onSubmitHandler(e))}>
          <label>Add to do</label>
          <input type="text" value={planInput} onChange={(e => setPlanInput(e.target.value))} />
          <span>{activeY}</span>/
          <span>{activeM+1}</span>/ 
          <span>{activeD}</span>
        </form>
        <PlanContainer>
          <PlanUl>
          {!schedules ? <span>계획된 일정이 없습니다</span> : 
              schedules.map(schedule => 
              <PlanLi key={schedule.id}>
                <span>{schedule.desc}</span>
                <span>{String(schedule.completed)}</span>
              </PlanLi>)
          }
          </PlanUl>
        </PlanContainer>
        <button onClick={()=> handleModal("add")}>ADD</button>
        <button onClick={()=> handleModal("edit")}>EDIT</button>
        <Modal isAdd={isAdd} openModal={openModal} setOpenModal={setOpenModal} />
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
