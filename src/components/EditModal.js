import React, { useState } from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import { comSchedule, delSchedule, editSchedule } from "_actions/calendar_actions";

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


const EditForm = styled.div`
    display: flex;
    flex-direction:column;
`;

const ButtonContainer = styled.div`
    display: flex;
`

const ToDoElement = styled.div`
    cursor: pointer;
    border: 1px solid;
`;

const EditModal = ({activeInfo, setActiveInfo}) => {
    const dispatch = useDispatch();
    const {id, title, desc, date} = activeInfo;
    const activeDate = date.toDate();
    const [titleIp, setTitleIP] = useState(title);
    const [descIP, setDescIP] = useState(desc);
    const closeModal = () => {
        setActiveInfo(false);
    }
    const onSubmitHandler = (id, type) => {
        switch (type) {
            case "edit":
                dispatch(editSchedule(id, titleIp, descIP));
                break;
            case "com":
                dispatch(comSchedule(id))
                break;
            case "del":
                dispatch(delSchedule(id))
                break;
            default:
                break;
            }
        closeModal();
    }
    if (activeInfo){
        window.addEventListener("keydown", (e) => e.keyCode === 27 ? closeModal(): null);
    }
    return (
        <Container show={activeInfo}>
            <ModalWindow>
                {activeInfo && 
                <EditForm>
                        <button onClick={() => closeModal()}>x</button>
                        <span>{activeDate.getFullYear()}</span>
                        <span>{activeDate.getMonth()}</span>
                        <span>{activeDate.getDate()}</span>
                        <input type="text" name="title" value={titleIp} onChange={(e => setTitleIP(e.target.value))} placeholder="Title" />
                        <input type="text" name="desc" value={descIP} onChange={(e => setDescIP(e.target.value))} placeholder="Description" />
                        <ButtonContainer>
                            <ToDoElement onClick={() => onSubmitHandler(id, "edit")}>수정</ToDoElement>
                            <ToDoElement onClick={() => onSubmitHandler(id, "com")}>완료</ToDoElement>
                            <ToDoElement onClick={() => onSubmitHandler(id, "del")}>삭제</ToDoElement>
                        </ButtonContainer>
                </EditForm>
                }
            </ModalWindow>
        </Container>
    )
}

export default EditModal;