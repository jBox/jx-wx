import { combineReducers } from "redux";
import {
    QUERY_ORDERS_SUCCESS
} from "../actions/ActionTypes";

const list = (state = [], action) => {
    switch (action.type) {
        case QUERY_ORDERS_SUCCESS:
            return [...state, ...action.orders];
        default:
            return state;
    }
};

const next = (state = "", action) => {
    switch (action.type) {
        case QUERY_ORDERS_SUCCESS:
            return action.next;
        default:
            return state;
    }
};

export default combineReducers({
    list,
    next
});