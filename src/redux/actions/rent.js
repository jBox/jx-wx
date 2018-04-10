import {
    API,
    UPDATE_ORDER_BASE,
    UPDATE_VEHICLES,
    SUBMIT_ORDER_REQUEST,
    SUBMIT_ORDER_SUCCESS,
    SUBMIT_ORDER_FAILURE,
    RESET_ORDER
} from "./ActionTypes";

export const updateVehicle = (vehicle) => ({
    type: UPDATE_VEHICLES,
    vehicle
});

export const updateOrder = (order) => ({
    type: UPDATE_ORDER_BASE,
    ...order
});

export const resetOrder = () => ({ type: RESET_ORDER });

export const submitOrder = (order) => {
    return {
        type: API,
        endpoint: { url: "/api/orders", method: "POST", data: order },
        before: ({ dispatch }) => dispatch({ type: SUBMIT_ORDER_REQUEST, order: data }),
        success: ({ data, dispatch }) => {
            dispatch({
                type: SUBMIT_ORDER_SUCCESS,
                order: data
            });
        }
    }
};