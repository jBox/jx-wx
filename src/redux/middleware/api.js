import { API } from "../actions/ActionTypes";
import qs from "qs";

const request = (endpoint, { token, settings }) => {
    const headers = { "Cache-Control": "no-cache", ...(endpoint.headers || {}) };
    if (token) {
        headers["Authorization"] = `${token.token_type} ${token.access_token}`;
    }

    const options = {
        method: endpoint.method || "GET",
        headers
    };
    const url = `${settings.api}${endpoint.url}`;
    if (endpoint.data && /^p(u|os)t$/ig.test(endpoint.method)) {
        headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(endpoint.data);
    }

    const checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            return Promise.reject(response.json());
        }
    };

    return fetch(url, options).then(checkStatus).then(res => res.json());
};

const noop = (arg) => (arg);

const perfect = (endpoint) => {
    if (typeof endpoint === "string") {
        return { url: endpoint, method: "GET" };
    }

    if (typeof endpoint === "object" && endpoint) {
        return { method: "GET", ...endpoint };
    }

    throw new Error("Invalid endpoint.");
};

// A Redux middleware that interprets actions with CALL info specified.
// Performs the call and promises when such actions are dispatched.
export default ({ dispatch, getState }) => next => action => {
    if (action.type !== API) {
        return next(action);
    }

    let { endpoint } = action;
    const beforeCb = action.before || noop;
    const successCb = action.success || noop;
    const errorCb = action.error || noop;
    const state = getState();

    if (typeof endpoint === "function") {
        endpoint = endpoint(state);
    }

    endpoint => perfect(endpoint);

    try {
        beforeCb({ dispatch, getState });
    } catch (ex) {
        console.error(ex);
    }

    const { auth: { token }, settings } = state;
    return request(endpoint, { token, settings }).then((data) => {
        console.log(data);
        return successCb({ dispatch, getState, data });
    }).catch((error) => {
        console.error(error);
        return errorCb({ dispatch, getState, error });
    })
}