import {
    API,
    QUERY_PROFILE_REQUEST,
    QUERY_PROFILE_SUCCESS,
    QUERY_PROFILE_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    RESET_CUSTOMER_STATUS
} from "./ActionTypes";
import isEmpty from "lodash/isEmpty";

export const initialLoad = () => (dispatch, getState) => {
    const { customer } = getState();
    if (isEmpty(customer.profile)) {
        return dispatch({
            type: API,
            endpoint: { url: "/api/customers/baseinfo" },
            before: ({ dispatch }) => dispatch({ type: QUERY_PROFILE_REQUEST }),
            error: ({ dispatch, error }) => dispatch({ type: QUERY_PROFILE_FAILURE, error }),
            success: ({ data, dispatch }) => {
                dispatch({
                    profile: data,
                    type: QUERY_PROFILE_SUCCESS
                });
            }
        });
    }
};


export const updateProfile = (profile) => {
    return {
        type: API,
        endpoint: { url: "/api/customers/baseinfo", method: "PUT", data: profile },
        before: ({ dispatch }) => dispatch({ type: UPDATE_PROFILE_REQUEST }),
        error: ({ error, dispatch }) => dispatch({ type: UPDATE_PROFILE_FAILURE, error }),
        success: ({ data, dispatch }) => {
            return dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                profile: data
            });
        }
    }
};

export const resetCustomerStatus = () => {
    return {
        type: RESET_CUSTOMER_STATUS
    };
};