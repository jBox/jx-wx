import { createSelector } from "reselect";

export const profileSelector = createSelector(
    (state) => state.customer,
    ({ profile, status, ready }) => {
        return { profile, status, ready };
    }
);
