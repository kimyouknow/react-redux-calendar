import React, { useEffect } from "react";
import styled from "styled-components";
import { MdDehaze, MdHome, MdPerson, MdAdd } from 'react-icons/md';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadSchedule, setModal } from "_actions/calendar_actions";


const Nav = styled.nav`
    font-size: 1em;
    font-weight: 600;
    position: absolute;
    right: 20px;
    bottom: 40px;
    display: ${props => props.open ? "none" : "flex"};
    flex-direction: column;
    justify-content: space-between;
    height: 240px;
    color: white;
    &:hover .subBtn {
        opacity: 1;
        visibility: visible;
        top: 0;
    }
    & svg {
        cursor: pointer;
        box-sizing: content-box;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        padding: 10px;
        background-color: rgba(0,0,0,0.5);
        :hover {
                transform: scale(1.2);
            }
        &.HomeBtn {
            background-color: #f8a5c2;
            z-index: 1;
            transition: all 0.4s ease;
        }
        &.ProfileBtn {
            background-color: #778beb;
            z-index: 2;
            transition: all 0.5s ease;
        }
        &.addBtn {
            background-color: #78e08f;
            z-index: 3;
            transition: all 0.5s ease;
        }
        &.menuBtn {
            background-color: #f7d794;
            z-index: 4;
        }
        &.subBtn {
            opacity: 0;
            visibility: hidden;
            top: 60px;
            position: relative;
        }
    }
`;

const AppRouter = ({user, modal}) => {
    const dispatch = useDispatch();
    const location = useLocation(); 
    const getSchedules = () => {
        if(user){
            dispatch(loadSchedule(user.uid))
        }
    }
    useEffect(() => {
        getSchedules();
    }, [user])
    return(
        <Nav open={modal}>
            <Link to="/">
                <MdHome className={"subBtn HomeBtn"} />
            </Link>
            <Link to="/profile">
                <MdPerson className={"subBtn ProfileBtn"} />
            </Link>
            {location.pathname === "/" ?
            <MdAdd className={"subBtn addBtn"} onClick={() => dispatch(setModal("add"))} />: null
            }
            <MdDehaze  className={"menuBtn"} />
        </Nav> 
    )
}

export default AppRouter;
