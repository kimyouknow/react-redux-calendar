import { fb_auth } from "firebaseConfig";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({userObj, refreshUser}) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const history = useHistory();
    const onLogoutClick = () => {
        fb_auth.signOut();
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
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
            displayName: newDisplayName,
            });
        }
        refreshUser();
    }
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
        </>
    )
}
export default Profile