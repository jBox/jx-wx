import React from "react";
import { Switch } from "react-router-dom";
import Route from "../../Route";
import OrderView from "./Order";
import CreateVehicle from "./CreateVehicle";
import ModifyVehicle from "./ModifyVehicle";
import Done from "./Done";
import Tracking from "./Tracking";

export const Order = OrderView;
export const CreateOrderVehicle = CreateVehicle;
export const ModifyOrderVehicle = ModifyVehicle;
export const OrderDone = Done;
export const OrderTracking = Tracking;

export default ({ routes }) => (
    <Switch>
        {routes.map((route, i) => <Route key={i} {...route} />)}
    </Switch>
);