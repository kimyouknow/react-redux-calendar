import React, {useState} from "react";
// import styled from "styled-components";
import Calendar from "components/Calendar/CalendarCon";
import Modal from "display/Modal";

function Home() {
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

export default Home;
