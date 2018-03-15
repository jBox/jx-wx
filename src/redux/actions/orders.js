import {
    API,
    QUERY_ORDERS_REQUEST,
    QUERY_ORDERS_SUCCESS,
    QUERY_ORDERS_FAILURE,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAILURE
} from "./ActionTypes";

export const initialLoad = () => (dispatch, getState) => {
    const { orders } = getState();
    if (orders.list.length === 0) {
        return dispatch({
            type: API,
            endpoint: { url: "/api/orders" },
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

export const loadMore = () => (dispatch, getState) => {
    const { orders: { next } } = getState();
    if (next) {
        return dispatch({
            type: API,
            endpoint: { url: `/api/orders?next=${next}` },
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