import { api } from "../../config/api";
import {
    ADD_ITEM_TO_CART_FAILURE,
    ADD_ITEM_TO_CART_REQUEST,
    ADD_ITEM_TO_CART_SUCCESS,
    CLEARE_CART_FAILURE,
    CLEARE_CART_REQUEST,
    CLEARE_CART_SUCCESS,
    FIND_CART_FAILURE,
    FIND_CART_REQUEST,
    FIND_CART_SUCCESS,
    REMOVE_CART_ITEM_FAILURE,
    REMOVE_CART_ITEM_REQUEST,
    REMOVE_CART_ITEM_SUCCESS,
    UPDATE_CART_ITEM_FAILURE,
    UPDATE_CART_ITEM_REQUEST,
    UPDATE_CART_ITEM_SUCCESS
} from "./ActionType";
import { SHOW_NOTIFICATION } from "../Notification/ActionType";

export const addItemToCart = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: ADD_ITEM_TO_CART_REQUEST });
        try {
            const { data } = await api.post(`/cart/add`, reqData.cartItem);
            if (data.success) {
                dispatch({
                    type: ADD_ITEM_TO_CART_SUCCESS,
                    payload: data.data
                });
                dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: { message: data.message, severity: "success" }
                });
            } else {
                dispatch({
                    type: ADD_ITEM_TO_CART_FAILURE,
                    payload: { message: data.message }
                });
                dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: { message: data.message, severity: "error" }
                });
            }
        } catch (error) {
            let errorMessage = "Failed to add item to cart. Please try again!";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            dispatch({
                type: ADD_ITEM_TO_CART_FAILURE,
                payload: { message: errorMessage }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: errorMessage, severity: "error" }
            });
        }
    };
};

export const findCart = () => {
    return async (dispatch) => {
        dispatch({ type: FIND_CART_REQUEST });
        try {
            const { data } = await api.get(`/cart`);
            if (data.success) {
                dispatch({
                    type: FIND_CART_SUCCESS,
                    payload: data.data
                });
            } else {
                dispatch({
                    type: FIND_CART_FAILURE,
                    payload: { message: data.message }
                });
                dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: { message: data.message, severity: "error" }
                });
            }
        } catch (error) {
            let errorMessage = "Failed to fetch cart. Please try again!";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            dispatch({
                type: FIND_CART_FAILURE,
                payload: { message: errorMessage }
            });
            // dispatch({
            //     type: SHOW_NOTIFICATION,
            //     payload: { message: errorMessage, severity: "error" }
            // });
        }
    };
};

export const updateCartItem = ({ id, quantity }) => {
    return async (dispatch) => {
        dispatch({ type: UPDATE_CART_ITEM_REQUEST });
        try {
            const { data } = await api.put(`/cart/update/${id}`, null, {
                params: { quantity }
            });
            if (data.success) {
                dispatch({
                    type: UPDATE_CART_ITEM_SUCCESS,
                    payload: data.data
                });
                // dispatch({
                //     type: SHOW_NOTIFICATION,
                //     payload: { message: data.message, severity: "success" }
                // });
                dispatch(findCart());
            } else {
                dispatch({
                    type: UPDATE_CART_ITEM_FAILURE,
                    payload: { message: data.message }
                });
                dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: { message: data.message, severity: "error" }
                });
            }
        } catch (error) {
            let errorMessage = "Failed to update cart item. Please try again!";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            dispatch({
                type: UPDATE_CART_ITEM_FAILURE,
                payload: { message: errorMessage }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: errorMessage, severity: "error" }
            });
        }
    };
};

export const removeCartItem = ({ cartItemId }) => {
    return async (dispatch) => {
        dispatch({ type: REMOVE_CART_ITEM_REQUEST });
        try {
            const { data } = await api.delete(`/cart/remove/${cartItemId}`);
            if (data.success) {
                dispatch({
                    type: REMOVE_CART_ITEM_SUCCESS,
                    payload: data.data
                });
                dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: { message: data.message, severity: "success" }
                });
                dispatch(findCart());
            } else {
                dispatch({
                    type: REMOVE_CART_ITEM_FAILURE,
                    payload: { message: data.message }
                });
                dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: { message: data.message, severity: "error" }
                });
            }
        } catch (error) {
            let errorMessage = "Failed to remove cart item. Please try again!";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            dispatch({
                type: REMOVE_CART_ITEM_FAILURE,
                payload: { message: errorMessage }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: errorMessage, severity: "error" }
            });
        }
    };
};

export const clearCart = () => {
    return async (dispatch) => {
        dispatch({ type: CLEARE_CART_REQUEST });
        try {
            const { data } = await api.delete(`/cart/clear`);
            if (data.success) {
                dispatch({
                    type: CLEARE_CART_SUCCESS,
                    payload: null
                });
                // dispatch({
                //     type: SHOW_NOTIFICATION,
                //     payload: { message: data.message, severity: "success" }
                // });
                dispatch(findCart());
            } else {
                dispatch({
                    type: CLEARE_CART_FAILURE,
                    payload: { message: data.message }
                });
                // dispatch({
                //     type: SHOW_NOTIFICATION,
                //     payload: { message: data.message, severity: "error" }
                // });
            }
        } catch (error) {
            let errorMessage = "Failed to clear cart. Please try again!";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            dispatch({
                type: CLEARE_CART_FAILURE,
                payload: { message: errorMessage }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: errorMessage, severity: "error" }
            });
        }
    };
};

export const applyCoupon = (couponCode) => {
    return async (dispatch) => {
        dispatch({ type: FIND_CART_REQUEST });
        try {
            const { data } = await api.post(`/cart/apply-coupon`, null, {
                params: { couponCode }
            });
            if (data.success) {
                dispatch({
                    type: FIND_CART_SUCCESS,
                    payload: data.data
                });
                dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: { message: data.message, severity: "success" }
                });
            } else {
                dispatch({
                    type: FIND_CART_FAILURE,
                    payload: { message: data.message }
                });
                dispatch({
                    type: SHOW_NOTIFICATION,
                    payload: { message: data.message, severity: "error" }
                });
            }
        } catch (error) {
            let errorMessage = "Failed to apply coupon. Please try again!";
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            dispatch({
                type: FIND_CART_FAILURE,
                payload: { message: errorMessage }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: errorMessage, severity: "error" }
            });
        }
    };
};