import { API } from "../actions/ActionTypes";
import qs from "qs";

const request = (endpoint, token) => {
    const headers = { "Cache-Control": "no-cache", ...(endpoint.headers || {}) };
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    if (endpoint.data && /^p(u|os)t$/ig.test(endpoint.method)) {
        headers["Content-Type"] = "application/json";
    }

    let url = `/api${endpoint.url}`;
    if (endpoint.params) {
        const search = qs.stringify(endpoint.params);
        if (search) {
            if (url.indexOf("?") === -1) {
                url = `${url}?${search}`;
            } else {
                url = `${url}&${search}`;
            }
        }
    }


    const request = {
        method: endpoint.method || "GET",
        headers,
        body: endpoint.data,
        mode: "cors"
    };

    return rex(url, request).then((res) => res.data);
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
    const doneCb = action.done || noop;
    const errorCb = action.error || noop;
    const state = getState();

    if (typeof endpoint === "function") {
        endpoint = endpoint(state);
    }

    endpoint => perfect(endpoint);

    try {
        before({ dispatch, getState });
    } catch (ex) {
        console.error(ex);
    }

    const { auth: { token } } = state;
    return request(endpoint, token).then((data) => {
        return doneCb({ dispatch, getState, data });
    }).catch((error) => {
        return errorCb({ dispatch, getState, error });
    })
}