import "./utils/dateFormat";
import React from "react";
import routes from "./routes";
import Route from "./Route";
import { Switch, BrowserRouter as Router } from "react-router-dom";
import rootReducer from "./redux/reducers";
import render from "./render";

render(rootReducer, (
    <Router>
        <Switch>
            {routes.map((route, i) => <Route key={i} {...route} />)}
        </Switch>
    </Router>
));