import React from "react";
import {
    Switch,
    Route,
    BrowserRouter as Router
} from "react-router-dom";
import Rent from "./Rent";
import CreateVehicle from "./CreateVehicle";
import ModifyVehicle from "./ModifyVehicle";

export default () => (
    <Router basename="/rent">
        <Switch>
            <Route exact path="/" component={Rent} />
            <Route exact path="/vehicles" component={CreateVehicle} />
            <Route path="/vehicles/:id" component={ModifyVehicle} />
        </Switch>
    </Router>
);