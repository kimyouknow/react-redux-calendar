import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserFB } from "_actions/user_actions";
import AppRouter from "components/Router";
import GlobalStyles from "components/GlobalStyles";
import Home from "display/Home";
import Auth from "display/Auth";
import Profile from "display/Profile";

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
    <Router>
      {user ? 
        <>
          <AppRouter user={user} modal={addModal} />
          <GlobalStyles />
        </> : 
        "Intailizing..."
        }
      <Switch>
          {user ? 
          <>
              <Route exact path="/">
                  <Home />
              </Route>
              <Route exact path="/profile">
                  <Profile />
              </Route>
          </> :
              <Route exact path="/">
                  <Auth />
              </Route>}
      </Switch>
  </Router>
  );
}

export default App;
