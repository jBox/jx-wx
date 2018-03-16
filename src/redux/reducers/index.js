import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import customer from "./customer";
import rent from "./rent";
import orders from "./orders";

export default combineReducers({
    customer,
    auth,
    settings,
    rent,
    orders
});