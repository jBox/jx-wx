import React from "react";
import { Switch } from "react-router-dom";
import Route from "../../Route";
import List from "./List";
import Details from "./Details";

export const OrdersList = List;
export const OrderDetails = Details;

export default ({ routes }) => (
    <Switch>
        {routes.map((route, i) => <Route key={i} {...route} />)}
    </Switch>
);