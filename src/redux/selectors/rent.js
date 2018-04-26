import { createSelector } from "reselect";

export const createVehicleSelector = createSelector(
    (state) => state.settings,
    (settings) => {
        return { models: settings.models };
    }
);

export const modifyVehicleSelector = createSelector(
    (state) => state.settings,
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
    (settings, vehicles, id) => {
        const vehicle = vehicles.find(x => x.id === id);
        return { models: settings.models, vehicle };
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