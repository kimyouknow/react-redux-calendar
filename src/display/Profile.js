import { fb_auth } from "firebaseConfig";
import styled from "styled-components";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { refreshUser, updatefb } from "_actions/user_actions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  font-size: 1.6rem;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  column-gap: 20px;
  margin-bottom: 40px;
  border-bottom: 1px solid;
`;

const Title = styled.div``;

const Button = styled.button`
  background-color: rgba(255, 107, 129, 1);
  color: #fff;
  padding: 10px;
  border-radius: 20px;
  cursor: pointer;
`;

const Form = styled.form`
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #dfe4ea;
  &.submit {
    margin-left: 40px;
    background-color: rgba(255, 107, 129, 1);
    color: #fff;
    padding: 10px;
    border-radius: 20px;
    border: none;
    cursor: pointer;
  }
`;

const Ul = styled.ul`
  margin-top: 50px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const Li = styled.li`
  display: flex;
  margin-bottom: 24px;
  & > div {
    text-align: center;
    width: 33%;
  }
  &.menu {
    font-size: 1.4rem;
    font-weight: 600;
  }
`;
const LiDate = styled.div`
  margin-right: 10px;
  padding-right: 10px;
  border-right: 2px solid rgba(0, 0, 0, 0.5);
`;

const LiTitle = styled.div`
  margin-right: 10px;
  padding-right: 10px;
  border-right: 2px solid rgba(0, 0, 0, 0.5);
`;
const LiDesc = styled.div``;

const Profile = () => {
  const {
    user: { user },
    calendar: { activeS },
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [newDisplayName, setNewDisplayName] = useState(user.displayName);
  const history = useHistory();
  const onLogoutClick = () => {
    fb_auth.signOut();
    dispatch(refreshUser());
    history.push("/");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (user.displayName !== newDisplayName) {
      dispatch(updatefb(newDisplayName));
    } else {
      window.alert("기존 닉네임과 같습니다");
    }
  };
  const showDate = (date) => {
    const Y = new Date(date).getFullYear();
    const M = new Date(date).getMonth();
    const D = new Date(date).getDate();
    return (
      <LiDate>
        {Y}년 {M + 1}월 {D}일
      </LiDate>
    );
  };
  return (
    <Container>
      <Header>
        <Title>{newDisplayName ?? "User"}'s Profile</Title>
        <Button onClick={onLogoutClick}>Log out</Button>
      </Header>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <Input className={"submit"} type="submit" value="Update Profile" />
      </Form>
      <Ul>
        <Li className={"menu"}>
          <LiDate>Date</LiDate>
          <LiTitle>Title</LiTitle>
          <LiDesc>Description</LiDesc>
        </Li>
        {activeS &&
          activeS.map((schedule) => (
            <Li key={schedule.id}>
              {showDate(schedule.date)}
              <LiTitle>{schedule.title}</LiTitle>
              <LiDesc>{schedule.desc}</LiDesc>
            </Li>
          ))}
      </Ul>
    </Container>
  );
};
export default Profile;
