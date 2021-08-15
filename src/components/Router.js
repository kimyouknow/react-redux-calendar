import React, { useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "display/Home";
import Auth from "display/Auth";
import Profile from "display/Profile";
import { useDispatch, useSelector } from "react-redux";
import { loadSchedule } from "_actions/calendar_actions";

const AppRouter = () => {
    const dispatch = useDispatch();
    const {user: {user}} = useSelector((state) => state);
    const getSchedules = () => {
        if(user){
            dispatch(loadSchedule(user.uid))
        }
    }
    useEffect(() => {
        getSchedules();
    }, [user])
    return(
        <Router>
            {user && 
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/profile">{user.displayName}'s Profile</Link>
                        </li>
                    </ul>
                </nav>  
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
    )
}

export default AppRouter;
