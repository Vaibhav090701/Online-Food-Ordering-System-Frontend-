import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEMS_BY_RESTAURENT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURENT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURENT_ID_SUCCESS, GET_RESTAURENT_MENU_FAILURE, GET_RESTAURENT_MENU_REQUEST, GET_RESTAURENT_MENU_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS } from "./ActionType"
import { api } from "../../config/api";

export const createMenuItem=({menu,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_MENU_ITEM_REQUEST})

        try {
            const {data}=await api.post(`api/admin/food`,menu,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            });
            console.log("menu item created", data);
            dispatch({type:CREATE_MENU_ITEM_SUCCESS, payload:data})

            
        } catch (error) {
            dispatch({type:CREATE_MENU_ITEM_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const getMenuItemByRestaurentId=(reqData)=>{
    return async(dispatch)=>{
        dispatch({type:GET_MENU_ITEMS_BY_RESTAURENT_ID_REQUEST})

        try {
            const {data}=await api.get(`/api/food/restaurent/${reqData.restaurentId}?isVegetarian=${reqData.isVegetarian}&isNonVegetarian=${reqData.isNonVegetarian}&isSeasonal=${reqData.isSeasonal}&foodCategory=${reqData.foodCategory}`,{
                headers:{
                    Authorization:`Bearer ${reqData.jwt}`,
                },
            });
            console.log("menu item found by restaurent id", data);
            dispatch({type:GET_MENU_ITEMS_BY_RESTAURENT_ID_SUCCESS, payload:data})

            
        } catch (error) {
            dispatch({type:GET_MENU_ITEMS_BY_RESTAURENT_ID_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}


export const deleteMenuItem=({foodId, jwt})=>{
    return async(dispatch)=>{
        dispatch({type:DELETE_MENU_ITEM_REQUEST})

        try {

            const [data]=await api.delete(`api/admin/food/${foodId}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            });

            console.log("Item deleted",data);
            dispatch({type:DELETE_MENU_ITEM_SUCCESS, payload:data})
            
        } catch (error) {
            dispatch({type:DELETE_MENU_ITEM_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const updateMenuItemsAvailability=({foodId,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST})

        try {
            const{data}=await api.put(`api/admin/food/${foodId}`,{},{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            });
            console.log("menu item availability updated", data);
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS, payload:data})
            
        } catch (error) {
            dispatch({type:UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, payload:error})
            console.log("error",error);
        }
    }
}

export const searchMenuItem=({keyword,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:SEARCH_MENU_ITEM_REQUEST})

        try {
            const {data}=await api.get(`api/food/search?name=${keyword}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
            });

            console.log("searched menu item", data);
            dispatch({type:SEARCH_MENU_ITEM_SUCCESS, payload:data})
            
        } catch (error) {
            dispatch({type:SEARCH_MENU_ITEM_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const getRestaurentMenu=({id,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURENT_MENU_REQUEST})

        try {
            const {data}=await api.get(`api/admin/food/${id}/menu`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
            });
            console.log("restaurent menu", data);
            dispatch({type:GET_RESTAURENT_MENU_SUCCESS, payload:data})

        } catch (error) {

            dispatch({type:GET_RESTAURENT_MENU_FAILURE, payload:error})
            console.log("error", error);
            
            
        }

    }
}

