import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadSchedule } from "_actions/calendar_actions";
import { fb_auth } from "../firebaseConfig";
import AppRouter from "./Router";

function App() {
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    dispatch(loadSchedule());
    fb_auth.onAuthStateChanged(user => {
      if(user) {
        if(user.displayName === null){
          // user.updateProfile({
          //   displayName: "Myitter"
          // });
          const ind = user.email.indexOf("@")
          const end = user.email.substring(0,ind)
          user.updateProfile({displayName:end})
        }
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      } else {
        setUserObj(null);
      }
      setInit(true)
    });
  },[])
  const refreshUser = () => {
    const user = fb_auth.currentUser;  
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  }
  return (
    <>
      {init ? 
      <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} refreshUser={refreshUser} /> : 
      "Intailizing..."
      }
    </>
  );
}

export default App;
