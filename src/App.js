import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserFB } from "_actions/user_actions";
import AppRouter from "components/Router";
import GlobalStyles from "components/GlobalStyles";


function App() {
  const dispatch = useDispatch();
  const {user: {user}, calendar: {addModal}} = useSelector((state) => state);
  const initApp = async () => {
    await dispatch(setUserFB());
  }
  useEffect(() => {
    initApp();
  },[])
  return (
    <>
      {user ? 
      <>
        <AppRouter user={user} modal={addModal} />
        <GlobalStyles />
      </> : 
      "Intailizing..."
      }
    </>
  );
}

export default App;
