import Home from "./Home";
import Rent, {
    Order,
    CreateOrderVehicle,
    ModifyOrderVehicle,
    OrderDone,
    OrderTracking
} from "./containers/Rent";
import Orders, {
    OrdersList,
    OrderDetails
} from "./containers/Orders";

export default [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/rent",
        component: Rent,
        routes: [
            {
                path: "/rent",
                exact: true,
                component: Order
            },
            {
                path: "/rent/vehicles",
                exact: true,
                component: CreateOrderVehicle
            },
            {
                path: "/rent/vehicles/:id",
                component: ModifyOrderVehicle
            },
            {
                path: "/rent/done",
                component: OrderDone
            },
            {
                path: "/rent/tracking",
                component: OrderTracking
            }
        ]
    },
    {
        path: "/orders",
        component: Orders,
        routes: [
            {
                path: "/orders",
                exact: true,
                component: OrdersList
            },
            {
                path: "/orders/:id",
                exact: true,
                component: OrderDetails
            }
        ]
    }
];