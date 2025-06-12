import { api } from "../../config/api";
import {
    CREATE_INGREDIENT_REQUEST,
    CREATE_INGREDIENT_SUCCESS,
    CREATE_INGREDIENT_FAILURE,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILURE,
    GET_INGREDIENT_BY_ID_REQUEST,
    GET_INGREDIENT_BY_ID_SUCCESS,
    GET_INGREDIENT_BY_ID_FAILURE,
    UPDATE_INGREDIENT_REQUEST,
    UPDATE_INGREDIENT_SUCCESS,
    UPDATE_INGREDIENT_FAILURE,
    DELETE_INGREDIENT_REQUEST,
    DELETE_INGREDIENT_SUCCESS,
    DELETE_INGREDIENT_FAILURE
} from "./ActionTypes";
import { SHOW_NOTIFICATION } from "../Notification/ActionType";

export const getAllIngredients = () => async (dispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    try {
        const { data } = await api.get(`/admin/ingredients`);
        if (data.success) {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                payload: data.data
            });
            // dispatch({
            //     type: SHOW_NOTIFICATION,
            //     payload: { message: data.message, severity: "success" }
            // });
        } else {
            dispatch({
                type: GET_INGREDIENTS_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to fetch ingredients. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: GET_INGREDIENTS_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const createIngredient = (reqData) => async (dispatch) => {
    dispatch({ type: CREATE_INGREDIENT_REQUEST });
    try {
        const { data } = await api.post(`/admin/ingredients`, reqData);
        if (data.success) {
            dispatch({
                type: CREATE_INGREDIENT_SUCCESS,
                payload: data.data
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            dispatch(getAllIngredients());
        } else {
            dispatch({
                type: CREATE_INGREDIENT_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to create ingredient. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: CREATE_INGREDIENT_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const getIngredientById = (ingredientId) => async (dispatch) => {
    dispatch({ type: GET_INGREDIENT_BY_ID_REQUEST });
    try {
        const { data } = await api.get(`/admin/ingredients/${ingredientId}`);
        if (data.success) {
            dispatch({
                type: GET_INGREDIENT_BY_ID_SUCCESS,
                payload: data.data
            });
            // dispatch({
            //     type: SHOW_NOTIFICATION,
            //     payload: { message: data.message, severity: "success" }
            // });
        } else {
            dispatch({
                type: GET_INGREDIENT_BY_ID_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to fetch ingredient. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: GET_INGREDIENT_BY_ID_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const updateIngredient = ({ id, reqData }) => async (dispatch) => {
    dispatch({ type: UPDATE_INGREDIENT_REQUEST });
    try {
        const { data } = await api.put(`/admin/ingredients/${id}`, reqData);
        if (data.success) {
            dispatch({
                type: UPDATE_INGREDIENT_SUCCESS,
                payload: data.data
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            dispatch(getAllIngredients());
        } else {
            dispatch({
                type: UPDATE_INGREDIENT_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to update ingredient. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: UPDATE_INGREDIENT_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const deleteIngredient = (ingredientId) => async (dispatch) => {
    dispatch({ type: DELETE_INGREDIENT_REQUEST });
    try {
        const { data } = await api.delete(`/admin/ingredients/${ingredientId}`);
        if (data.success) {
            dispatch({
                type: DELETE_INGREDIENT_SUCCESS,
                payload: ingredientId
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            dispatch(getAllIngredients());
        } else {
            dispatch({
                type: DELETE_INGREDIENT_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to delete ingredient. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: DELETE_INGREDIENT_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const updateStockOfIngredient = ({ id, quantityInStock }) => async (dispatch) => {
    dispatch({ type: UPDATE_INGREDIENT_REQUEST });
    try {
        const { data } = await api.put(`/admin/ingredients/${id}/stock`, null, {
            params: { quantityInStock }
        });
        if (data.success) {
            dispatch({
                type: UPDATE_INGREDIENT_SUCCESS,
                payload: data.data
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            dispatch(getAllIngredients());
        } else {
            dispatch({
                type: UPDATE_INGREDIENT_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to update ingredient stock. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: UPDATE_INGREDIENT_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};