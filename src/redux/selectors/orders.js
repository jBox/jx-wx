import { createSelector } from "reselect";

export const orderSelector = createSelector(
    (state, props) => {
        const { match: { params: { id } } } = props;
        return id;
    },
    (state) => state.orders,
    (id, orders) => {
        const order = orders.list.find(x => x.id === id);
        return { order };
    }
);

export const trackingSelector = createSelector(
    (state, props) => {
        const { match: { params: { id } } } = props;
        return id;
    },
    (state) => state.orders,
    (id, orders) => {
        const order = orders.list.find(x => x.id === id);
        return { order };
    }
);

export default createSelector(
    (state) => state.orders,
    (orders) => {
        return { orders: orders.list, hasMore: !!orders.next };
    }
);