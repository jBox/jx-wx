import {
    API,
    QUERY_ORDERS_REQUEST,
    QUERY_ORDERS_SUCCESS,
    QUERY_ORDERS_FAILURE
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