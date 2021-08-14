import React, {useEffect, useState} from "react";
// import styled from "styled-components";
import Calendar from "components/Calendar/CalendarCon";
import Modal from "display/Modal";
// import { useDispatch } from "react-redux";
// import { loadFB } from "_actions/calendar_actions";

function Home() {
  // const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const handleModal = () => !openModal ? setOpenModal(true) : setOpenModal(false);
  // useEffect(() => {
  //   dispatch(loadFB())
  // }, [])
  return (
    <>
        <Calendar />
        <button onClick={()=> handleModal()}>ADD</button>
        <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
}

export default Home;
