import { combineReducers } from "redux";
import {
    QUERY_ORDERS_SUCCESS,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAILURE,
    RESET_ORDER_STATUS
} from "../actions/ActionTypes";

const cancelOrder = (state, order) => {
    const items = [];
    for (let item of state) {
        if (item.id === order.id) {
            items.push(order);
        } else {
            items.push(item);
        }
    }

    return items;
};

const deleteOrder = (state, order) => {
    const items = [];
    for (let item of state) {
        if (item.id !== order.id) {
            items.push(item);
        } else {
            items.push({ ...order, deleted: true });
        }
    }

    return items;
};

const list = (state = [], action) => {
    switch (action.type) {
        case UPDATE_ORDER_SUCCESS:
            const { order, operation } = action;
            if (operation === "cancel") {
                return cancelOrder(state, order);
            }

            if (operation === "delete") {
                return deleteOrder(state, order);
            }

            return state;
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

const status = (state = {}, action) => {
    const { order, operation } = action;
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
            return { ...state, [order.id]: { state: "request", operation } }
        case UPDATE_ORDER_SUCCESS:
            return { ...state, [order.id]: { state: "success", operation } }
        case UPDATE_ORDER_FAILURE:
            return { ...state, [order.id]: { state: "failure", operation, error: action.error } }
        case RESET_ORDER_STATUS:
            return { ...state, [order.id]: { state: "initial" } }
        default:
            return state;
    }
}

export default combineReducers({
    list,
    next,
    status
});