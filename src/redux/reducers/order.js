import { combineReducers } from "redux";
import {
    UPDATE_ORDER,
    UPDATE_VEHICLES,
    SUBMIT_ORDER_REQUEST,
    SUBMIT_ORDER_SUCCESS
} from "../actions/ActionTypes";

const getDefaultDepartureTime = () => {
    const now = new Date();
    now.setDate(now.getDate() + 1);
    const [date] = now.toISOString().split("T");
    return `${date}T09:00`
};

const id = (state = "", action) => {
    switch (action.type) {
        case UPDATE_ORDER:
            return action.id;
        case SUBMIT_ORDER_REQUEST:
        case SUBMIT_ORDER_SUCCESS:
            return action.order.id;
        default:
            return state;
    }
};

const name = (state = "", action) => {
    switch (action.type) {
        case UPDATE_ORDER:
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
        case UPDATE_ORDER:
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
        case UPDATE_ORDER:
            return action.departureTime;
        case SUBMIT_ORDER_REQUEST:
        case SUBMIT_ORDER_SUCCESS:
            return action.order.departureTime;
        default:
            return state;
    }
};

const departurePlace = (state = "", action) => {
    switch (action.type) {
        case UPDATE_ORDER:
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
        case UPDATE_ORDER:
            return action.destination;
        case SUBMIT_ORDER_REQUEST:
        case SUBMIT_ORDER_SUCCESS:
            return action.order.destination;
        default:
            return state;
    }
};

const duration = (state = 3, action) => {
    switch (action.type) {
        case UPDATE_ORDER:
            return action.duration;
        case SUBMIT_ORDER_REQUEST:
        case SUBMIT_ORDER_SUCCESS:
            return action.order.duration;
        default:
            return state;
    }
};

const vehicles = (state = [], action) => {
    switch (action.type) {
        case UPDATE_VEHICLES:
            const { vehicle } = action;
            const index = state.findIndex(x => x.id === vehicle.id);
            if (index > -1) {
                // modify
                const newState = [...state];
                newState[index] = vehicle;
                return newState;
            } else {
                // add
                vehicle.id = state.length;
                return [...state, vehicle];
            }
        case SUBMIT_ORDER_REQUEST:
        case SUBMIT_ORDER_SUCCESS:
            return [...action.order.vehicles];
        default:
            return state;
    }
};

export default combineReducers({
    id,
    name,
    mobile,
    departureTime,
    departurePlace,
    destination,
    duration,
    vehicles
});