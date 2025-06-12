import { api } from "../../config/api";
import {
    CREATE_MENU_ITEM_REQUEST,
    CREATE_MENU_ITEM_SUCCESS,
    CREATE_MENU_ITEM_FAILURE,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
    GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
    UPDATE_MENU_ITEM_REQUEST,
    UPDATE_MENU_ITEM_SUCCESS,
    UPDATE_MENU_ITEM_FAILURE,
    DELETE_MENU_ITEM_REQUEST,
    DELETE_MENU_ITEM_SUCCESS,
    DELETE_MENU_ITEM_FAILURE,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILURE,
    UPDATE_INGREDIENT_STOCK_REQUEST,
    UPDATE_INGREDIENT_STOCK_SUCCESS,
    UPDATE_INGREDIENT_STOCK_FAILURE,
    UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST,
    UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS,
    UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE,
    SEARCH_MENU_ITEM_REQUEST,
    SEARCH_MENU_ITEM_SUCCESS,
    SEARCH_MENU_ITEM_FAILURE,
    GET_MENU_ITEM_BY_CATEGORY_REQUEST,
    GET_MENU_ITEM_BY_CATEGORY_SUCCESS,
    GET_MENU_ITEM_BY_CATEGORY_FAILURE,
    GET_RESTAURENT_MENU_REQUEST,
    GET_RESTAURENT_MENU_SUCCESS,
    GET_RESTAURENT_MENU_FAILURE
} from "./ActionType";
import { SHOW_NOTIFICATION } from "../Notification/ActionType";
import { useNavigate } from "react-router-dom";


export const createMenuItem = ({ reqData, restaurantId }) =>{
    return async (dispatch) => {
    dispatch({ type: CREATE_MENU_ITEM_REQUEST });
    try {
        const { data } = await api.post("/admin/menu", reqData);
        if (data.success) {
            dispatch({
                type: CREATE_MENU_ITEM_SUCCESS,
                payload: data.data
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });

            if (restaurantId) {
                dispatch(getMenuItemByRestaurantId({ restaurantId }));
            }
        } else {
            dispatch({
                type: CREATE_MENU_ITEM_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to create menu item. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: CREATE_MENU_ITEM_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
}
};

export const getMenuItemByRestaurantId = ({ restaurantId }) => async (dispatch) => {
    dispatch({ type: GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST });
    try {
        const { data } = await api.get(`/admin/menu/restaurant/${restaurantId}`);
        if (data.success) {
            dispatch({
                type: GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS,
                payload: data.data
            });
            // dispatch({
            //     type: SHOW_NOTIFICATION,
            //     payload: { message: data.message, severity: "success" }
            // });
        } else {
            dispatch({
                type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to fetch menu items. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const updateMenuItem = ({ itemId, reqData, restaurantId }) => async (dispatch) => {
    dispatch({ type: UPDATE_MENU_ITEM_REQUEST });
    try {
        const { data } = await api.put(`/admin/menu/${itemId}`, reqData);
        if (data.success) {
            dispatch({
                type: UPDATE_MENU_ITEM_SUCCESS,
                payload: data.data
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            if (restaurantId) {
                dispatch(getMenuItemByRestaurantId({ restaurantId }));
            }
        } else {
            dispatch({
                type: UPDATE_MENU_ITEM_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to update menu item. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: UPDATE_MENU_ITEM_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const deleteMenuItem = ({ id}) => async (dispatch) => {
    dispatch({ type: DELETE_MENU_ITEM_REQUEST });
    try {
        const { data } = await api.delete(`/admin/menu/${id}`);
        if (data.success) {
            dispatch({
                type: DELETE_MENU_ITEM_SUCCESS,
                payload: data.message
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
            // if (restaurantId) {
            //     dispatch(getMenuItemByRestaurantId({ restaurantId }));
            // }
        } else {
            dispatch({
                type: DELETE_MENU_ITEM_FAILURE,
                payload: { message: data.message }
            });
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
        }
    } catch (error) {
        let errorMessage = "Failed to delete menu item. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }
        dispatch({
            type: DELETE_MENU_ITEM_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const getIngredients = () => async (dispatch) => {
    dispatch({ type: GET_INGREDIENTS_REQUEST });
    try {
        const { data } = await api.get("/admin/menu/ingredients");
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

export const updateIngredientStock = ({ ingredientId, quantity }) => async (dispatch) => {
    dispatch({ type: UPDATE_INGREDIENT_STOCK_REQUEST });
    try {
        const { data } = await api.put(`/admin/menu/ingredients/${ingredientId}?quantity=${quantity}`);
        if (data.success) {
            dispatch({
                type: UPDATE_INGREDIENT_STOCK_SUCCESS,
                payload: data.data
            });
            dispatch({
                type: SHOW_NOTIFICATION,    
                payload: { message: data.message, severity: "success" }
            });
            dispatch(getIngredients());
        } else {
            dispatch({
                type: UPDATE_INGREDIENT_STOCK_FAILURE,
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
            type: UPDATE_INGREDIENT_STOCK_FAILURE,
            payload: { message: errorMessage }
        });
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" }
        });
    }
};

export const updateMenuItemsAvailability=({foodId,restaurantId})=>{
    return async(dispatch)=>{
        dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST})

        try {
            const{data}=await api.put(`/admin/restaurant/menu/${foodId}/availability`,{});
            console.log("menu item availability updated", data);
            if(data.success){
                dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload:data})
            if (restaurantId) {
                dispatch(getMenuItemByRestaurantId({ restaurantId }));
            }
            }
            else{
                dispatch({type:SHOW_NOTIFICATION,
                payload:{message:data.message || "Failed to change availability", sevrity:"error"}
                })
                dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload:data.data})

            }
            
        } catch (error) {
                dispatch({type:SHOW_NOTIFICATION,
                payload:{message:data.message || "Failed to change availability", sevrity:"error"}
                })

            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload:error})
        }
    }
}

export const searchMenuItem=({keyword})=>{
    return async(dispatch)=>{
        dispatch({type:SEARCH_MENU_ITEM_REQUEST})

        try {
            const {data}=await api.get(`/food/search?name=${keyword}`,{});

            console.log("searched menu item", data);
            dispatch({type:SEARCH_MENU_ITEM_SUCCESS, payload:data})
            
        } catch (error) {
            dispatch({type:SEARCH_MENU_ITEM_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const getRestaurentMenu=({id})=>{
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURENT_MENU_REQUEST})

        try {
            const {data}=await api.get(`/restaurants/menu/${id}`);
            console.log("restaurent menu", data);
            dispatch({type:GET_RESTAURENT_MENU_SUCCESS, payload:data.data})

        } catch (error) {

            dispatch({type:GET_RESTAURENT_MENU_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const getMenuItemByCategory=({id})=>{
    return async(dispatch)=>{
        dispatch({type:GET_MENU_ITEM_BY_CATEGORY_REQUEST})

        try {
            const {data}=await api.get(`/admin/preDefineMenuItem/category/${id}`,{});
            console.log("Menu item by category", data);
            dispatch({type:GET_MENU_ITEM_BY_CATEGORY_SUCCESS, payload:data.data})

        } catch (error) {
            dispatch({type:GET_MENU_ITEM_BY_CATEGORY_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}
