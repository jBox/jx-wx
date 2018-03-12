import {
    UPDATE_ORDER,
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
    type: UPDATE_ORDER,
    ...order
});

export const resetOrder = () => ({ type: RESET_ORDER });

export const submitOrder = (order) => (dispatch) => {
    dispatch({
        type: SUBMIT_ORDER_REQUEST,
        order
    });

    setTimeout(() => dispatch({
        type: SUBMIT_ORDER_SUCCESS,
        order: {
            ...order,
            id: "20180313090001",
            status: "submit",
            traces: [{ operator: "系统", state: "订单已经生成" }]
        }
    }), 1000);
};