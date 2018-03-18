import App from "./containers/App";
import NotFound from "./containers/NotFound";
import Rent, {
    Order,
    CreateOrderVehicle,
    ModifyOrderVehicle,
    OrderDone,
    OrderTracking
} from "./containers/Rent";
import Orders, {
    OrdersList,
    OrderDetails,
    OrderTrackingDetails
} from "./containers/Orders";
import Profile from "./containers/Profile";

export default [
    {
        path: "/",
        exact: true,
        component: App
    },
    {
        path: "/index",
        exact: true,
        component: App
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
            },
            {
                path: "/orders/:id/tracking",
                exact: true,
                component: OrderTrackingDetails
            }
        ]
    },
    {
        path: "/profile",
        component: Profile
    },
    {
        component: NotFound
    }
];