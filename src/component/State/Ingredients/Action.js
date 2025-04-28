import { api } from "../../config/api";
import { SHOW_NOTIFICATION } from "../Notification/ActionType";
import { CREATE_INGREDIENT_CATEGORY_FAILURE, CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_FAILURE, CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, GET_ALL_PRE_DEFINE_INGREDIENT_FAILURE, GET_ALL_PRE_DEFINE_INGREDIENT_REQUEST, GET_ALL_PRE_DEFINE_INGREDIENT_SUCCESS, GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_FAILURE, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, UPDATE_INGREDIENT_FAILURE, UPDATE_INGREDIENT_REQUEST, UPDATE_INGREDIENT_SUCCESS, UPDATE_STOCK } from "./ActionTypes";

export const getIngredientsOfRestaurent=(jwt)=>{
    return async(dispatch)=>{

        try {
            const {data}=await api.get(`/api/admin/ingredients`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
            });
            console.log("restaurent ingredients", data);
            dispatch({type:GET_INGREDIENTS, payload:data})
            
        } catch (error) {
            console.log("error", error);
        }
    }
}

export const createIngredient=({reqData,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_INGREDIENT_REQUEST})

        try {
            const {data}=await api.post(`/api/admin/ingredients`, reqData,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
            });
            console.log("Ingredient created", data);
            dispatch({type:CREATE_INGREDIENT_SUCCESS, payload:data})
            dispatch({type:SHOW_NOTIFICATION,
                payload:{message:"Ingredient created successfully", severity: 'success'}
            })

            
        } catch (error) {
            dispatch({type:CREATE_INGREDIENT_FAILURE, payload:error})
            console.log("error", error);
            dispatch({
                type: SHOW_NOTIFICATION,
                    payload: { message: 'Failed to create ingredient', severity: 'error' }
                });    


        }
    }
}

export const createIngredientCategory=({reqData,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_INGREDIENT_CATEGORY_REQUEST})

        try {
            const {data}=await api.post(`api/admin/ingredients/category`, reqData,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
            });
            console.log("ingredient category created", data);
            dispatch({type:CREATE_INGREDIENT_CATEGORY_SUCCESS, payload:data})
            
        } catch (error) {
            dispatch({type:CREATE_INGREDIENT_CATEGORY_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const getIngredientCategory=({id,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:GET_INGREDIENT_CATEGORY_REQUEST})

        try {
            const {data}=await api.get(`api/admin/ingredients/restaurent/${id}/category`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
            });
            console.log("get ingredient category", data);
            dispatch({type:GET_INGREDIENT_CATEGORY_SUCCESS, payload:data})
            
        } catch (error) {
            dispatch({type:GET_INGREDIENT_CATEGORY_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const updateStockOfIngredient=({id,jwt})=>{
    return async(dispatch)=>{

        try {
            const {data}=await api.put(`api/admin/ingredients/${id}/stock`,{},{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
            });
            console.log("ingredient stock updated", data);
            dispatch({type:UPDATE_STOCK, payload:data})
            
        } catch (error) {
            console.log("error", error);
        }
    }
}

export const updateIngredientDetails=({id,jwt,reqData})=>{
    return async(dispatch)=>{
        dispatch({type:UPDATE_INGREDIENT_REQUEST})

        try {
            const {data}=await api.put(`/api/admin/ingredients/${id}`,reqData,{
                headers:{
                    Authorization:`Bearer ${jwt}`   
                },
            });
            console.log("ingredient details updated", data);
            dispatch({type:UPDATE_INGREDIENT_SUCCESS, payload:data})
            dispatch({type:SHOW_NOTIFICATION,
                payload:{message:"Ingredient updated successfully", severity: 'success'}
            })
            
        } catch (error) {
            console.log("error", error);
            dispatch({type:UPDATE_INGREDIENT_FAILURE, payload:error})
               // Trigger error notification
        dispatch({
            type: SHOW_NOTIFICATION,
                payload: { message: 'Failed to update ingredient', severity: 'error' }
            });
        }
    }
}

export const getAllPreDefineIngredients=(jwt)=>{
    return async(dispatch)=>{
        dispatch({type:GET_ALL_PRE_DEFINE_INGREDIENT_REQUEST})
        try {
            const {data}=await api.get(`/api/admin/preDefineIngredient`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
            });
            dispatch({type:GET_ALL_PRE_DEFINE_INGREDIENT_SUCCESS, payload:data})
            console.log("PreDefineIngredients", data);
            
        } catch (error) {
            console.log("error",error);
            dispatch({type:GET_ALL_PRE_DEFINE_INGREDIENT_FAILURE, payload:error});
            
        }
    }
}



