//// CALL API ////
export const API = "@CALL/API";
/********************************/

/***************** START RENT *****************/
export const UPDATE_ORDER_BASE = "rent/update";
export const UPDATE_VEHICLES = "rent/vehicles/update";
export const SUBMIT_ORDER_REQUEST = "rent/submit/req";
export const SUBMIT_ORDER_SUCCESS = "rent/submit/sec";
export const SUBMIT_ORDER_FAILURE = "rent/submit/fai";
export const RESET_ORDER = "rent/reset";
/***************** END RENT   *****************/

/***************** START ORDERS *****************/
export const INIT_LOAD_ORDERS_REQUEST = "orders/init/req";
export const INIT_LOAD_ORDERS_SUCCESS = "orders/init/suc";
export const INIT_LOAD_ORDERS_FAILURE = "orders/init/fai";
export const QUERY_ORDERS_REQUEST = "orders/req";
export const QUERY_ORDERS_SUCCESS = "orders/suc";
export const QUERY_ORDERS_FAILURE = "orders/fai";
export const UPDATE_ORDER_REQUEST = "orders/update/req";
export const UPDATE_ORDER_SUCCESS = "orders/update/suc";
export const UPDATE_ORDER_FAILURE = "orders/update/fai";
export const RESET_ORDER_STATUS = "orders/stat/r";
/***************** END ORDERS   *****************/

/***************** START CUSTOMER *****************/
export const QUERY_PROFILE_REQUEST = "customer/q/req";
export const QUERY_PROFILE_SUCCESS = "customer/q/suc";
export const QUERY_PROFILE_FAILURE = "customer/q/fai";
export const UPDATE_PROFILE_REQUEST = "customer/mod/req";
export const UPDATE_PROFILE_SUCCESS = "customer/mod/suc";
export const UPDATE_PROFILE_FAILURE = "customer/mod/fai";
export const RESET_CUSTOMER_STATUS = "customer/stat/r";
/***************** END CUSTOMER   *****************/