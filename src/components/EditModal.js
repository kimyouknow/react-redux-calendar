import React, { useState } from "react";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import { comFB, delFB, editFB } from "_actions/calendar_actions";

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
    font-size: 2rem;
    z-index: 100;
`;

const ModalWindow = styled.div`
    width: 50vw;
    min-width: 400px;
    min-height: 500px;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
`;

const EditForm = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100%;
`;
const Header = styled.div`
    padding: 10px 5px;
    font-size: 1.6rem;
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dfe4ea;
    margin-bottom: 10px;
    position: relative;
    .button{
        position: absolute;
        left: 5px;
        top: 0px;
        margin-right: 10px;
        cursor: pointer;
    }
    .title{
        width: 100%;
        text-align: center;
    }
`;

const Body = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    padding: 8px;
    height: 90%;
`;
const Span = styled.span`
    width: 100%;
    align-self: flex-start;
    font-size: 1.6rem;
`;
const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-around;
`

const ToDoElement = styled.div`
    cursor: pointer;
    background-color: rgba(255, 107, 129,1.0);
    color: #fff;
    padding: 10px;
    width: 32%;
    border-radius: 20px;
    text-align: center;
`;

const Input = styled.input`
    width: 100%;
    padding: 0 10px;
    border-bottom: 1px solid #dfe4ea;
`;
const Textarea = styled.textarea`
    width: 100%;
    height: 50%;
    font-size: 1rem;
    padding: 10px;
    border: 1px solid #dfe4ea;
    ::placeholder{
        color: rgba(0,0,0,0.3);
        font-size: 1rem;
        font-weight: 600;
    }
`;

const EditModal = ({activeInfo, setActiveInfo, handleModal}) => {
    const dispatch = useDispatch();
    const {id, title, desc, date, completed} = activeInfo;
    const activeDate = new Date(date);
    const [titleIp, setTitleIP] = useState(title);
    const [descIP, setDescIP] = useState(desc);
    const closeModal = () => {
        setActiveInfo(false);
        handleModal("edit");
    }
    const onSubmitHandler = (id, type) => {
        switch (type) {
            case "edit":
                dispatch(editFB(id, titleIp, descIP));
                break;
            case "com":
                dispatch(comFB(id, completed))
                break;
            case "del":
                const ok = window.confirm("Are you sure?");
                if(ok){
                    dispatch(delFB(id))
                }
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
                    <Header>
                        <button className={"button"} onClick={() => closeModal()}>◀</button>
                        <div className={"title"}>
                            <span>{activeDate.getFullYear()}년</span>
                            <span>{activeDate.getMonth()}월</span>
                            <span>{activeDate.getDate()}일</span>
                        </div>
                    </Header>
                    <Body>
                        <Span>Title</Span>
                        <Input type="text" name="title" value={titleIp} onChange={(e => setTitleIP(e.target.value))} placeholder="Title" />
                        <Span>Description</Span>
                        <Textarea type="text" name="desc" value={descIP} onChange={(e => setDescIP(e.target.value))} placeholder="Description" />
                        <ButtonContainer>
                            <ToDoElement onClick={() => onSubmitHandler(id, "edit")}>수정</ToDoElement>
                            <ToDoElement onClick={() => onSubmitHandler(id, "com")}>
                                {completed ? "취소" : "완료"}
                            </ToDoElement>
                            <ToDoElement onClick={() => onSubmitHandler(id, "del")}>삭제</ToDoElement>
                        </ButtonContainer>
                    </Body>
                </EditForm>
                }
            </ModalWindow>
        </Container>
    )
}

export default EditModal;