import { createSelector } from "reselect";

export const modifySelector = createSelector(
    (state) => state.order.vehicles,
    (state, props) => {
        const { vehicles } = state.order;
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

export default createSelector(
    (state) => state.order,
    (state) => state.status,
    (order, status) => {
        return { order, status };
    }
);