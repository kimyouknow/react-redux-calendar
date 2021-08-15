import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUserFB } from "_actions/user_actions";
import AppRouter from "./Router";

function App() {
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);
  const initApp = async () => {
    await dispatch(setUserFB());
    setInit(true)
  }
  useEffect(() => {
    initApp();
  },[])
  return (
    <>
      {init ? 
      <AppRouter /> : 
      "Intailizing..."
      }
    </>
  );
}

export default App;
