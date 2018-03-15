import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import api from "./redux/middleware/api";

const configureStore = (rootReducer, preloadedState) => {
    const middlewares = [api, thunk, logger];
    const store = createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(...middlewares)
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept("../reducers", () => {
            store.replaceReducer(rootReducer);
        });
    }

    return store;
}

export default configureStore;
