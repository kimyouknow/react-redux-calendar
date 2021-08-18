import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import { addFB, setModal } from "_actions/calendar_actions";

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

const Header = styled.div`
    padding: 10px 5px;
    font-size: 0.7em;
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dfe4ea;
    margin-bottom: 20px;
    position: relative;
    .button{
        position: absolute;
        left: 10px;
        top: 8px;
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
    height: 90%;
`;
const InputD = styled.input`
    border-bottom: 1px solid #dfe4ea;
    height: 10%;
`;
const Form = styled.form`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
    height: 90%;
    padding: 20px 0;
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

const Button = styled.button`
    margin-top: 24px;
    background-color: rgba(255, 107, 129,1.0);
    color: #fff;
    padding: 10px;
    width: 100%;
    border-radius: 20px;
    cursor: pointer;
`;

const Modal = () => {
    const {user: {user}, calendar: {addModal}} = useSelector((state) => state);
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [activeDate, setActiveDate] = useState(new Date());
    const onChangeHandler = (value) => {
        const Y = Number(value.slice(0,4))
        const M = Number(value.slice(5,7))-1
        const D = Number(value.slice(8,10))
        setActiveDate(new Date(Y,M,D));
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        // console.log(activeDate)
        dispatch(addFB(user.uid, activeDate, title, desc));
        setTitle("");
        setDesc("")
    }
    const setModalOpen = () => {
        dispatch(setModal("add"));
    }
    if (addModal){
        window.addEventListener("keydown", (e) => e.keyCode === 27 ? setModalOpen(): null);
    }
    return (
        <Container show={addModal}>
            <ModalWindow>
                <Header>
                    <button className={"button"} onClick={() => setModalOpen()}>◀</button>
                    <div className={"title"}>일정 추가</div>
                </Header>
                <Body>
                    <InputD type="date" value={activeDate.toISOString().substring(0, 10)} onChange={(e) => onChangeHandler(e.target.value)} />
                    <Form onSubmit={(e => onSubmitHandler(e))}>
                        <Input type="text" name="title" value={title} onChange={(e => setTitle(e.target.value))} placeholder="Title" />
                        <Textarea type="text" name="desc" value={desc} onChange={(e => setDesc(e.target.value))} placeholder="Description" />
                        <Button type="submit">+ ADD</Button>
                    </Form>
                </Body>
            </ModalWindow>
        </Container>
    )
}
export default Modal;
