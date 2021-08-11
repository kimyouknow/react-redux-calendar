import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "display/Home";
import Auth from "display/Auth";
import Profile from "display/Profile";

const AppRouter = ({isLoggedIn, userObj, refreshUser}) => {
    return(
        <Router>
            {isLoggedIn && 
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/profile">{userObj.displayName}'s Profile</Link>
                        </li>
                    </ul>
                </nav>  
            }
            <Switch>
                {isLoggedIn ? 
                <>
                    <Route exact path="/">
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile userObj={userObj} refreshUser={refreshUser} />
                    </Route>
                </> :
                    <Route exact path="/">
                        <Auth />
                    </Route>}
            </Switch>
        </Router>
    )
}

export default AppRouter;
