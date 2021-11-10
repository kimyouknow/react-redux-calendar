import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserFB } from "_actions/user_actions";
import AppRouter from "components/Router";
import GlobalStyles from "components/GlobalStyles";

function App() {
  const dispatch = useDispatch();
  const initApp = async () => {
    await dispatch(setUserFB());
  };
  useEffect(() => {
    initApp();
  }, []);
  return (
    <>
      <AppRouter />
      <GlobalStyles />
    </>
  );
}

export default App;
