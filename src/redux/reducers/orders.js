import { combineReducers } from "redux";

const list = (state = [{
    id: "20180303097834",
    name: "小红",
    mobile: "18988996789",
    departureTime: "20180303097834",
    departurePlace: "20180303097834",
    destination: "20180303097834",
    status: "submit",
    createTime: new Date().toISOString(),
    vehicles: [{ model: "mvp", count: 2, withDriver: true }],
    traces: [
        { operator: "System", state: "Good" },
        { operator: "操作员", state: "还可以哦" }
    ]
}, {
    id: "20180303097835",
    name: "小红",
    mobile: "18988996789",
    departureTime: "20180303097834",
    departurePlace: "20180303097834",
    destination: "20180303097834",
    status: "submit",
    notes: "sfasf afasf",
    createTime: new Date().toISOString(),
    vehicles: [{ model: "mvp", count: 2, withDriver: true }],
    traces: [{ operator: "System", state: "Good" }]
}], action) => {
    return state;
}

export default combineReducers({
    list
});