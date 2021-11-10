import React, { useState } from "react";
import styled from "styled-components";
import { MdAdd } from "react-icons/md";
import EditModal from "components/EditModal";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 1.6rem;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  column-gap: 20px;
  margin-bottom: 10px;
  border-bottom: 1px solid;
`;

const WeekContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

const WeekComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  font-weight: 600;
  :nth-child(7n + 1) {
    color: #ff4d4d;
  }
  :nth-child(7n) {
    color: #17c0eb;
  }
`;

const DisplayMonth = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const Button = styled.div`
  color: rgba(0, 0, 0, 0.5);
  &:hover {
    cursor: pointer;
  }
`;

const DateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 20px;
`;

const DateEle = styled.div`
  padding: 6px;
  margin-bottom: 4px;
  color: ${(props) => (props.today ? "#fff" : "#000")};
  background-color: ${(props) =>
    props.today ? "rgba(255, 107, 129,1.0)" : "none"};
  border-radius: ${(props) => (props.today ? "50%" : "none")};
`;

const DateComponent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 120px;
  min-width: 62px;
  position: relative;
  background-color: ${(props) =>
    props.isCur ? "transparent" : "rgba(0,0,0,0.2)"};
  :nth-child(7n + 1) {
    color: #ff4d4d;
  }
  :nth-child(7n) {
    color: #17c0eb;
  }
`;

const ToDoContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  z-index: 5;
  &:hover .overflow {
    opacity: 1;
    visibility: visible;
  }
`;

const ToDoElement = styled.div`
  font-size: 0.9rem;
  padding: 4px 0;
  color: #fff;
  margin-top: 4px;
  text-align: center;
  background-color: ${(props) =>
    props.done ? "rgba(255, 107, 129,1.0)" : "rgba(164, 176, 190,1.0)"};
  border-radius: 6px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) =>
      props.done ? "rgba(255, 107, 129,0.5)" : "rgba(164, 176, 190,0.5)"};
  }
  &.overflow {
    z-index: 10;
    opacity: 0;
    visibility: hidden;
  }
  &.more {
    text-align: center;
  }
`;

const CalendarPre = ({
  activeDate,
  dates,
  activeS,
  handleLastMonth,
  handleNextMonth,
  handleToday,
  handleModal,
}) => {
  const weeks = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const { activeM, activeY } = activeDate;
  const [activeInfo, setActiveInfo] = useState(null);
  const compareDate = (input) => {
    const inputDate = new Date(input);
    const inputY = String(inputDate.getFullYear());
    const inputM = String(inputDate.getMonth());
    const inputD = String(inputDate.getDate());
    return inputY + inputM + inputD;
  };
  const filterd = (date) =>
    activeS.filter((obj) => {
      // console.log(obj)
      return compareDate(obj.date) === compareDate(date.date);
    });
  return (
    <Container>
      <Header>
        <Button onClick={() => handleLastMonth()}>◀</Button>
        <DisplayMonth onClick={() => handleToday()}>
          {activeY}년 {activeM + 1}월
        </DisplayMonth>
        <Button onClick={() => handleNextMonth()}>▶</Button>
      </Header>
      <WeekContainer>
        {weeks.map((week) => (
          <WeekComponent key={week}>{week}</WeekComponent>
        ))}
      </WeekContainer>
      <DateContainer>
        {/* {console.log(dates)} */}
        {!dates ? (
          <h1>Loading</h1>
        ) : (
          dates.map((date) => (
            <DateComponent key={date.date} isCur={date.isCur}>
              <DateEle
                today={
                  date.date.getDate() === new Date().getDate() &&
                  date.date.getMonth() === new Date().getMonth()
                }
              >
                {date.date.getDate()}
              </DateEle>
              {filterd(date) && (
                <ToDoContainer>
                  {filterd(date).length > 3 ? (
                    <>
                      <ToDoElement
                        onClick={() => {
                          setActiveInfo(filterd(date)[0]);
                          handleModal("edit");
                        }}
                      >
                        {filterd(date)[0].title.length > 8
                          ? filterd(date)[0].title.substring(0, 8) + "..."
                          : filterd(date)[0].title}
                      </ToDoElement>
                      <ToDoElement className={"more"}>
                        <MdAdd />
                      </ToDoElement>
                      {filterd(date)
                        .slice(1)
                        .map((ele, idx) => (
                          <ToDoElement
                            className={"overflow"}
                            done={ele.completed}
                            key={idx}
                            onClick={() => {
                              setActiveInfo(ele);
                              handleModal("edit");
                            }}
                          >
                            {ele.title.length > 8
                              ? ele.title.substring(0, 8) + "..."
                              : ele.title}
                          </ToDoElement>
                        ))}
                    </>
                  ) : (
                    filterd(date).map((ele, idx) => (
                      <ToDoElement
                        done={ele.completed}
                        key={idx}
                        onClick={() => {
                          setActiveInfo(ele);
                          handleModal("edit");
                        }}
                      >
                        {ele.title.length > 8
                          ? ele.title.substring(0, 8) + "..."
                          : ele.title}
                      </ToDoElement>
                    ))
                  )}
                </ToDoContainer>
              )}
            </DateComponent>
          ))
        )}
      </DateContainer>
      {activeInfo && (
        <EditModal
          activeInfo={activeInfo}
          setActiveInfo={setActiveInfo}
          handleModal={handleModal}
        />
      )}
    </Container>
  );
};

export default CalendarPre;
