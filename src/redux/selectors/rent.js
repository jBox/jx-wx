import { createSelector } from "reselect";

export const modifySelector = createSelector(
    (state) => state.rent.order.vehicles,
    (state, props) => {
        const { vehicles } = state.rent.order;
        const { match: { params: { id } } } = props;
        const index = Number(id);
        if (index >= 0) {
            return index;
        }

        return -1;
    },
    (vehicles, id) => {
        const vehicle = vehicles.find(x => x.id === id);
        return { vehicle };
    }
);

export const doneSelector = createSelector(
    (state) => state.rent.order,
    (order) => {
        return { order };
    }
);

export const trackingSelector = createSelector(
    (state) => state.rent.order,
    (order) => {
        return { order };
    }
);

export default createSelector(
    (state) => state.rent.order,
    (state) => state.rent.status,
    (order, status) => {
        return { order, status };
    }
);