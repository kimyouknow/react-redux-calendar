import { fb_auth } from "firebaseConfig";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { refreshUser, updatefb } from "_actions/user_actions";

const Profile = () => {
    const {user: {user}, calendar:{activeS}} = useSelector((state) => state);
    const dispatch = useDispatch();
    const [newDisplayName, setNewDisplayName] = useState(user.displayName);
    const history = useHistory();
    const onLogoutClick = () => {
        fb_auth.signOut();
        dispatch(refreshUser());
        history.push("/");
    }
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
        } else{
            window.alert("기존 닉네임과 같습니다")
        }
        // dispatch(refreshUser());
    }
    console.log(activeS)
    return (
        <>
            <form onSubmit={onSubmit}>
                <input
                onChange={onChange}
                type="text"
                placeholder="Display name"
                value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogoutClick}>Log out</button>
            <ul>
                {activeS && 
                    activeS.map(schedule => 
                        <li key={schedule.id}>
                            {schedule.title}
                        </li>)
                }
            </ul>
        </>
    )
}
export default Profile