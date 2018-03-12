import React from "react";
import { Switch } from "react-router-dom";
import Route from "../../Route";
import List from "./List";
import Details from "./Details";
import Tracking from "./Tracking";

export const OrdersList = List;
export const OrderDetails = Details;
export const OrderTrackingDetails = Tracking;

export default ({ routes }) => (
    <Switch>
        {routes.map((route, i) => <Route key={i} {...route} />)}
    </Switch>
);