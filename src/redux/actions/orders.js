import {
    API,
    INIT_LOAD_ORDERS_REQUEST,
    INIT_LOAD_ORDERS_SUCCESS,
    INIT_LOAD_ORDERS_FAILURE,
    QUERY_ORDERS_REQUEST,
    QUERY_ORDERS_SUCCESS,
    QUERY_ORDERS_FAILURE,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAILURE,
    RESET_ORDER_STATUS
} from "./ActionTypes";

export const initialLoad = (filter) => (dispatch, getState) => {
    const { orders } = getState();
    if (filter || orders.list.length === 0) {
        if (!filter) {
            filter = "all";
        }
        return dispatch({
            type: API,
            endpoint: { url: `/api/orders?filter=${filter}` },
            before: ({ dispatch }) => dispatch({ type: INIT_LOAD_ORDERS_REQUEST }),
            success: ({ data, dispatch }) => {
                dispatch({
                    ...data,
                    type: INIT_LOAD_ORDERS_SUCCESS
                });
            }
        });
    }
};

export const loadMore = (filter) => (dispatch, getState) => {
    const { orders: { next } } = getState();
    if (next) {
        return dispatch({
            type: API,
            endpoint: { url: `/api/orders?next=${next}&filter=${filter}` },
            before: ({ dispatch }) => dispatch({ type: QUERY_ORDERS_REQUEST }),
            success: ({ data, dispatch }) => {
                dispatch({
                    ...data,
                    type: QUERY_ORDERS_SUCCESS
                });
            }
        });
    }
};

const updateOrder = (order, operation) => {
    const data = { version: order.version, operation };
    return {
        type: API,
        endpoint: { url: `/api/orders/${order.id}`, method: "PUT", data },
        before: ({ dispatch }) => dispatch({ type: UPDATE_ORDER_REQUEST, order, operation }),
        error: ({ error, dispatch }) => dispatch({ type: UPDATE_ORDER_FAILURE, order, operation, error }),
        success: ({ data, dispatch }) => {
            return dispatch({
                type: UPDATE_ORDER_SUCCESS,
                order: data,
                operation
            });
        }
    }
}

export const cancelOrder = (order) => updateOrder(order, "cancel");

export const deleteOrder = (order) => updateOrder(order, "delete");

export const resetOrderStatus = (order) => {
    return {
        type: RESET_ORDER_STATUS,
        order
    };
}