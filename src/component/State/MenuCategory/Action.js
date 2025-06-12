import { api } from "../../config/api";
import {
    CREATE_MENU_CATEGORY_REQUEST,
    CREATE_MENU_CATEGORY_SUCCESS,
    CREATE_MENU_CATEGORY_FAILURE,
    GET_ALL_MENU_CATEGORIES_REQUEST,
    GET_ALL_MENU_CATEGORIES_SUCCESS,
    GET_ALL_MENU_CATEGORIES_FAILURE,
    GET_RESTAURANT_MENU_CATEGORIES_REQUEST,
    GET_RESTAURANT_MENU_CATEGORIES_SUCCESS,
    GET_RESTAURANT_MENU_CATEGORIES_FAILURE,
    UPDATE_MENU_CATEGORY_REQUEST,
    UPDATE_MENU_CATEGORY_SUCCESS,
    UPDATE_MENU_CATEGORY_FAILURE,
    DELETE_MENU_CATEGORY_REQUEST,
    DELETE_MENU_CATEGORY_SUCCESS,
    DELETE_MENU_CATEGORY_FAILURE
} from "./ActionType";
import { SHOW_NOTIFICATION } from "../Notification/ActionType";

export const createMenuCategory = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_MENU_CATEGORY_REQUEST });
    try {
        const { data } = await api.post("/admin/restaurant/menu-category", reqData);
        if (data.success) {
            dispatch({
                type: CREATE_MENU_CATEGORY_SUCCESS,
                payload: data.data
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            dispatch(getRestaurantMenuCategories());
        } else {
            dispatch({
                type: CREATE_MENU_CATEGORY_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to create menu category. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: CREATE_MENU_CATEGORY_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const createGlobalCategory = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_MENU_CATEGORY_REQUEST });
    try {
        const { data } = await api.post("/admin/restaurant/menu-category/global", reqData);
        if (data.success) {
            dispatch({
                type: CREATE_MENU_CATEGORY_SUCCESS,
                payload: data.data
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            dispatch(getRestaurantMenuCategories());
        } else {
            dispatch({
                type: CREATE_MENU_CATEGORY_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to create global menu category. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: CREATE_MENU_CATEGORY_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const getAllMenuCategories = () => async (dispatch) => {
    dispatch({ type: GET_ALL_MENU_CATEGORIES_REQUEST });
    try {
        const { data } = await api.get("/admin/restaurant/menu-category");
        console.log("Categories", data);
        
        if (data.success) {
            dispatch({
                type: GET_ALL_MENU_CATEGORIES_SUCCESS,
                payload: data.data
            });
            // dispatch({
            //     type: SHOW_NOTIFICATION,
            //     payload: { message: data.message, severity: "success" }
            // });
        } else {
            dispatch({
                type: GET_ALL_MENU_CATEGORIES_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to fetch menu categories. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: GET_ALL_MENU_CATEGORIES_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const getRestaurantMenuCategories = () => async (dispatch) => {
    dispatch({ type: GET_RESTAURANT_MENU_CATEGORIES_REQUEST });
    try {
        const { data } = await api.get("/admin/restaurant/menu-category/restaurant");
        if (data.success) {
            dispatch({
                type: GET_RESTAURANT_MENU_CATEGORIES_SUCCESS,
                payload: data.data
            });
            // dispatch({
            //     type: SHOW_NOTIFICATION,
            //     payload: { message: data.message, severity: "success" }
            // });
        } else {
            dispatch({
                type: GET_RESTAURANT_MENU_CATEGORIES_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to fetch restaurant menu categories. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: GET_RESTAURANT_MENU_CATEGORIES_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const updateMenuCategory = ({ id, reqData }) => async (dispatch) => {
    dispatch({ type: UPDATE_MENU_CATEGORY_REQUEST });
    try {
        const { data } = await api.put(`/admin/restaurant/menu-category/${id}`, reqData);
        if (data.success) {
            dispatch({
                type: UPDATE_MENU_CATEGORY_SUCCESS,
                payload: data.data
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            dispatch(getRestaurantMenuCategories());
        } else {
            dispatch({
                type: UPDATE_MENU_CATEGORY_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to update menu category. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: UPDATE_MENU_CATEGORY_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const deleteMenuCategory = (id) => async (dispatch) => {
    dispatch({ type: DELETE_MENU_CATEGORY_REQUEST });
    try {
        const { data } = await api.delete(`/admin/restaurant/menu-category/${id}`);
        if (data.success) {
            dispatch({
                type: DELETE_MENU_CATEGORY_SUCCESS,
                payload: id
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            dispatch(getRestaurantMenuCategories());
        } else {
            dispatch({
                type: DELETE_MENU_CATEGORY_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to delete menu category. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: DELETE_MENU_CATEGORY_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};