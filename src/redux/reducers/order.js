import { combineReducers } from "redux";
import isUndefined from "lodash/isUndefined";
import {
    UPDATE_ORDER_BASE,
    UPDATE_VEHICLES,
    SUBMIT_ORDER_REQUEST,
    SUBMIT_ORDER_SUCCESS,
    RESET_ORDER
} from "../actions/ActionTypes";

const getDefaultDepartureTime = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    now.setHours(9);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    return now.toISOString();
};

const id = (state = "", action) => {
    switch (action.type) {
        case UPDATE_ORDER_BASE:
            return action.id;
        case SUBMIT_ORDER_REQUEST:
        case SUBMIT_ORDER_SUCCESS:
            return action.order.id;
        case RESET_ORDER:
            return "";
        default:
            return state;
    }
};

const status = (state = "", action) => {
    switch (action.type) {
        case SUBMIT_ORDER_SUCCESS:
            return action.order.status;
        case RESET_ORDER:
            return "";
        default:
            return state;
    }
};

const traces = (state = [], action) => {
    switch (action.type) {
        case SUBMIT_ORDER_SUCCESS:
            return action.order.traces;
        case RESET_ORDER:
            return [];
        default:
            return state;
    }
};

const name = (state = "", action) => {
    switch (action.type) {
        case UPDATE_ORDER_BASE:
            return action.name;
        case SUBMIT_ORDER_REQUEST:
        case SUBMIT_ORDER_SUCCESS:
            return action.order.name;
        default:
            return state;
    }
};

const mobile = (state = "", action) => {
    switch (action.type) {
        case UPDATE_ORDER_BASE:
            return action.mobile;
        case SUBMIT_ORDER_REQUEST:
        case SUBMIT_ORDER_SUCCESS:
            return action.order.mobile;
        default:
            return state;
    }
};

const departureTime = (state = getDefaultDepartureTime(), action) => {
    switch (action.type) {
        case UPDATE_ORDER_BASE:
            return action.departureTime;
        case SUBMIT_ORDER_REQUEST:
        case SUBMIT_ORDER_SUCCESS:
            return action.order.departureTime;
        case RESET_ORDER:
            return getDefaultDepartureTime();
        default:
            return state;
    }
};

const departurePlace = (state = "", action) => {
    switch (action.type) {
        case UPDATE_ORDER_BASE:
            return action.departurePlace;
        case SUBMIT_ORDER_REQUEST:
        case SUBMIT_ORDER_SUCCESS:
            return action.order.departurePlace;
        default:
            return state;
    }
};

const destination = (state = "", action) => {
    switch (action.type) {
        case UPDATE_ORDER_BASE:
            return action.destination;
        case SUBMIT_ORDER_REQUEST:
        case SUBMIT_ORDER_SUCCESS:
            return action.order.destination;
        case RESET_ORDER:
            return "";
        default:
            return state;
    }
};

const duration = (state = 3, action) => {
    switch (action.type) {
        case UPDATE_ORDER_BASE:
            return action.duration;
        case SUBMIT_ORDER_REQUEST:
        case SUBMIT_ORDER_SUCCESS:
            return action.order.duration;
        case RESET_ORDER:
            return 3;
        default:
            return state;
    }
};

const notes = (state = "", action) => {
    switch (action.type) {
        case UPDATE_ORDER_BASE:
            return action.notes;
        case SUBMIT_ORDER_REQUEST:
        case SUBMIT_ORDER_SUCCESS:
            return action.order.notes;
        case RESET_ORDER:
            return "";
        default:
            return state;
    }
};

const createTime = (state = "", action) => {
    switch (action.type) {
        case SUBMIT_ORDER_SUCCESS:
            return action.order.createTime;
        default:
            return state;
    }
};

const vehicles = (state = [], action) => {
    switch (action.type) {
        case UPDATE_VEHICLES:
            const { vehicle } = action;
            if (isUndefined(vehicle.id)) {
                // add
                vehicle.id = Number("" + Date.now() + state.length);
                return [...state, vehicle];
            } else {
                const index = state.findIndex(x => x.id === vehicle.id);
                if (index > -1) {
                    // modify
                    const newState = [...state];
                    if (vehicle.delete) {
                        newState.splice(index, 1);
                    } else {
                        newState[index] = vehicle;
                    }
                    return newState;
                }
            }

            return state;
        case SUBMIT_ORDER_REQUEST:
            return [...action.order.vehicles];
        case SUBMIT_ORDER_SUCCESS: {
            const tick = "" + Date.now();
            return action.order.vehicles.map((item, index) => ({
                id: Number(tick + index),
                ...item
            }));
        }
        case RESET_ORDER:
            return [];
        default:
            return state;
    }
};

const service = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_BASE:
            return action.service;
        case SUBMIT_ORDER_REQUEST:
        case SUBMIT_ORDER_SUCCESS:
            return action.order.service;
        case RESET_ORDER:
            return {};
        default:
            return state;
    }
};

export default combineReducers({
    id,
    status,
    name,
    mobile,
    departureTime,
    departurePlace,
    destination,
    duration,
    notes,
    createTime,
    traces,
    vehicles,
    service
});