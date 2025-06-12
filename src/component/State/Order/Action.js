import { api } from "../../config/api";
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    GET_ORDER_DETAILS_REQUEST,
    GET_ORDER_DETAILS_SUCCESS,
    GET_ORDER_DETAILS_FAILURE,
    GET_USERS_ORDERS_REQUEST,
    GET_USERS_ORDERS_SUCCESS,
    GET_USERS_ORDERS_FAILURE,
    CANCEL_ORDER_REQUEST,
    CANCEL_ORDER_SUCCESS,
    CANCEL_ORDER_FAILURE,
    GET_RESTAURANT_ORDERS_REQUEST,
    GET_RESTAURANT_ORDERS_SUCCESS,
    GET_RESTAURANT_ORDERS_FAILURE,
    UPDATE_ORDER_STATUS_REQUEST,
    UPDATE_ORDER_STATUS_SUCCESS,
    UPDATE_ORDER_STATUS_FAILURE
} from "./ActionTypes";
import { SHOW_NOTIFICATION } from "../Notification/ActionType";

export const createOrder = ({ reqData, navigate }) =>{
    return async (dispatch) => {
    dispatch({ type: CREATE_ORDER_REQUEST });
    try {
        const { data } = await api.post("/orders", reqData);
        if (data.success) {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload: data.data
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            if (navigate) {
                navigate("/my-profile/orders");
            }
            return { success: true, data: data.data }; // ✅ return value
        } else {
            dispatch({
                type: CREATE_ORDER_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to create order. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
}
};

export const getOrderDetails = (orderId) => async (dispatch) => {
    dispatch({ type: GET_ORDER_DETAILS_REQUEST });
    try {
        const { data } = await api.get(`/orders/${orderId}`);
        if (data.success) {
            dispatch({
                type: GET_ORDER_DETAILS_SUCCESS,
                payload: data.data
            });
            // dispatch({
            //     type: SHOW_NOTIFICATION,
            //     payload: { message: data.message, severity: "success" }
            // });
        } else {
            dispatch({
                type: GET_ORDER_DETAILS_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to fetch order details. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: GET_ORDER_DETAILS_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const getUserOrders = () => async (dispatch) => {
    dispatch({ type: GET_USERS_ORDERS_REQUEST });
    try {
        const { data } = await api.get("/orders/history");
        if (data.success) {
            dispatch({
                type: GET_USERS_ORDERS_SUCCESS,
                payload: data.data
            });
            // dispatch({
            //     type: SHOW_NOTIFICATION,
            //     payload: { message: data.message, severity: "success" }
            // });
        } else {
            dispatch({
                type: GET_USERS_ORDERS_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to fetch user orders. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: GET_USERS_ORDERS_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const cancelOrder = (orderId) => async (dispatch) => {
    dispatch({ type: CANCEL_ORDER_REQUEST });
    try {
        const { data } = await api.put(`/orders/cancel/${orderId}`);
        if (data.success) {
            dispatch({
                type: CANCEL_ORDER_SUCCESS,
                payload: data.data
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            dispatch(getUserOrders());
        } else {
            dispatch({
                type: CANCEL_ORDER_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to cancel order. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: CANCEL_ORDER_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const getRestaurantOrders = ({ status = "ALL", page = 0, size = 10 }) => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_ORDERS_REQUEST });
    try {
        const { data } = await api.get(`/admin/restaurant/orders?status=${status}&page=${page}&size=${size}`);
        
        if (data.success) {
            dispatch({
                type: GET_RESTAURANT_ORDERS_SUCCESS,
                payload: data.data
            });
            // dispatch({
            //     type: SHOW_NOTIFICATION,
            //     payload: { message: data.message, severity: "success" }
            // });
        } else {
            dispatch({
                type: GET_RESTAURANT_ORDERS_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to fetch restaurant orders. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: GET_RESTAURANT_ORDERS_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const updateOrderStatus = ({ orderId, status }) => async (dispatch) => {
    dispatch({ type: UPDATE_ORDER_STATUS_REQUEST });
    try {
        const { data } = await api.put(`/orders/${orderId}/status?status=${status}`);
        if (data.success) {
            dispatch({
                type: UPDATE_ORDER_STATUS_SUCCESS,
                payload: data.data
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            dispatch(getRestaurantOrders({}));
        } else {
            dispatch({
                type: UPDATE_ORDER_STATUS_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to update order status. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: UPDATE_ORDER_STATUS_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};