import React from "react";
import { render } from "react-dom";
import configureStore from "./configureStore";
import { Provider } from "react-redux";

module.exports = (rootReducer, router) => {

    const preloadedState = window.__INITIAL_STATE__;
    const store = configureStore(rootReducer, preloadedState);

    return render(
        <Provider store={store}>
            {router}
        </Provider>,
        document.getElementById("root")
    );
}