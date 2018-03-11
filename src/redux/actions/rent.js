import {
    UPDATE_ORDER,
    UPDATE_VEHICLES,
    SUBMIT_ORDER_REQUEST,
    SUBMIT_ORDER_SUCCESS,
    SUBMIT_ORDER_FAILURE
} from "./ActionTypes";

export const updateVehicle = (vehicle) => ({
    type: UPDATE_VEHICLES,
    vehicle
});

export const updateOrder = (order) => ({
    type: UPDATE_ORDER,
    ...order
});

export const submitOrder = (order) => (dispatch) => {
    dispatch({
        type: SUBMIT_ORDER_REQUEST,
        order
    });
};