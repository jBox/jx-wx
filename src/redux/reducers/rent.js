import { combineReducers } from "redux";
import auth from "./auth";
import settings from "./settings";
import order from "./order";

import {
    SUBMIT_ORDER_REQUEST,
    SUBMIT_ORDER_SUCCESS,
    SUBMIT_ORDER_FAILURE
} from "../actions/ActionTypes";

const status = (state = "init", action) => {
    switch (action.type) {
        case SUBMIT_ORDER_REQUEST:
            return "submit";
        case SUBMIT_ORDER_SUCCESS:
            return "success";
        default:
            return state;
    }
};

export default combineReducers({
    auth,
    settings,
    order,
    status
});