import React from "react";
import Calendar from "components/Calendar/CalendarCon";
import Modal from "display/Modal";

function Home({openModal ,setOpenModal}) {
  return (
    <>
        <Calendar/>
        <Modal />
    </>
  );
}

export default Home;
