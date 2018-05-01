import { createSelector } from "reselect";

export const orderSelector = createSelector(
    (state, props) => {
        const { match: { params: { id } } } = props;
        return id;
    },
    (state) => state.orders,
    (id, orders) => {
        const status = orders.status[id] || { state: "initial" };
        const order = orders.list.find(x => x.id === id);
        return { order, status };
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
        const list = orders.list.filter(x => !x.deleted);
        return { orders: list, hasMore: !!orders.next, filter: orders.filter };
    }
);