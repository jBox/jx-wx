import { combineReducers } from "redux";
import {
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    QUERY_PROFILE_REQUEST,
    QUERY_PROFILE_SUCCESS,
    QUERY_PROFILE_FAILURE,
    RESET_CUSTOMER_STATUS
} from "../actions/ActionTypes";

const profile = (state = {}, action) => {
    switch (action.type) {
        case QUERY_PROFILE_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return action.profile;
        default:
            return state;
    }
};

const status = (state = { state: "initial" }, action) => {
    switch (action.type) {
        case QUERY_PROFILE_REQUEST:
            return { state: "request", operation: "initial" };
        case UPDATE_PROFILE_REQUEST:
            return { state: "request", operation: "update" };
        case QUERY_PROFILE_SUCCESS:
            return { state: "success", operation: "initial" };
        case UPDATE_PROFILE_SUCCESS:
            return { state: "success", operation: "update" };
        case QUERY_PROFILE_FAILURE:
            return { state: "failure", operation: "initial" };
        case UPDATE_PROFILE_FAILURE:
            return { state: "failure", operation: "update" };
        case RESET_CUSTOMER_STATUS:
            return { state: "initial" };
        default:
            return state;
    }
};

const ready = (state = false, action) => {
    switch (action.type) {
        case QUERY_PROFILE_REQUEST:
            return false
        case QUERY_PROFILE_SUCCESS:
        case QUERY_PROFILE_FAILURE:
            return true;
        default:
            return state;
    }
};

export default combineReducers({
    profile,
    status,
    ready
});