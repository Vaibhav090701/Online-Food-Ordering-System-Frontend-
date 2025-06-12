import { api } from "../../config/api";
import {
    CREATE_ADDRESS_REQUEST,
    CREATE_ADDRESS_SUCCESS,
    CREATE_ADDRESS_FAILURE,
    GET_ALL_ADDRESS_REQUEST,
    GET_ALL_ADDRESS_SUCCESS,
    GET_ALL_ADDRESS_FAILURE,
    UPDATE_ADDRESS_DEFAULT_REQUEST,
    UPDATE_ADDRESS_DEFAULT_SUCCESS,
    UPDATE_ADDRESS_DEFAULT_FAILURE,
    UPDATE_ADDRESS_REQUEST,
    UPDATE_ADDRESS_SUCCESS,
    UPDATE_ADDRESS_FAILURE,
    DELETE_ADDRESS_REQUEST,
    DELETE_ADDRESS_SUCCESS,
    DELETE_ADDRESS_FAILURE
} from "./ActionType";
import { SHOW_NOTIFICATION } from "../Notification/ActionType";

export const createAddress = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_ADDRESS_REQUEST });
    try {
        const { data } = await api.post(`/addresses`, reqData.addressData);
        if (data.success) {
            dispatch({
                type: CREATE_ADDRESS_SUCCESS,
                payload: data.data
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            dispatch(getUsersAddress()); // Refresh address list
        } else {
            dispatch({
                type: CREATE_ADDRESS_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to create address. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: CREATE_ADDRESS_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const getUsersAddress = () => async (dispatch) => {
    dispatch({ type: GET_ALL_ADDRESS_REQUEST });
    try {
        const { data } = await api.get(`/addresses`);
        console.log("All Addresses", data);
        
        if (data.success) {
            dispatch({
                type: GET_ALL_ADDRESS_SUCCESS,
                payload: data.data
            });
            
        } else {
            dispatch({
                type: GET_ALL_ADDRESS_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to fetch addresses. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: GET_ALL_ADDRESS_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const updateAddressDefault = ({ addressId }) => async (dispatch) => {
    dispatch({ type: UPDATE_ADDRESS_DEFAULT_REQUEST });
    try {
        const { data } = await api.put(`/addresses/${addressId}/default`);
        if (data.success) {
            dispatch({
                type: UPDATE_ADDRESS_DEFAULT_SUCCESS,
                payload: data.data
            });
            // dispatch({
            //     type: SHOW_NOTIFICATION,
            //     payload: { message: data.message, severity: "success" }
            // });
            // dispatch(getUsersAddress()); // Refresh address list
        } else {
            dispatch({
                type: UPDATE_ADDRESS_DEFAULT_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to update default address. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: UPDATE_ADDRESS_DEFAULT_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const updateAddress = ({ addressId, addressData }) => async (dispatch) => {
    dispatch({ type: UPDATE_ADDRESS_REQUEST });
    try {
        const { data } = await api.put(`/addresses/${addressId}`, addressData);
        if (data.success) {
            dispatch({
                type: UPDATE_ADDRESS_SUCCESS,
                payload: data.data
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            dispatch(getUsersAddress()); // Refresh address list
        } else {
            dispatch({
                type: UPDATE_ADDRESS_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to update address. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: UPDATE_ADDRESS_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const deleteAddress = ({ addressId }) => async (dispatch) => {
    dispatch({ type: DELETE_ADDRESS_REQUEST });
    try {
        const { data } = await api.delete(`/addresses/${addressId}`);
        if (data.success) {
            dispatch({
                type: DELETE_ADDRESS_SUCCESS,
                payload: addressId
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            dispatch(getUsersAddress()); // Refresh address list
        } else {
            dispatch({
                type: DELETE_ADDRESS_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to delete address. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: DELETE_ADDRESS_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};  