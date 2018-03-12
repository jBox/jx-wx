import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import rent from "./rent";
import orders from "./orders";

export default combineReducers({
    auth,
    settings,
    rent,
    orders
});