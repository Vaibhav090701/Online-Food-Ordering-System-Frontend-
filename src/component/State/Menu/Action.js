import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEM_BY_CATEGORY_FAILURE, GET_MENU_ITEM_BY_CATEGORY_REQUEST, GET_MENU_ITEM_BY_CATEGORY_SUCCESS, GET_MENU_ITEMS_BY_RESTAURENT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURENT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURENT_ID_SUCCESS, GET_RESTAURENT_MENU_FAILURE, GET_RESTAURENT_MENU_REQUEST, GET_RESTAURENT_MENU_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS } from "./ActionType"
import { api } from "../../config/api";
import { SHOW_NOTIFICATION } from "../Notification/ActionType";

export const createMenuItem=({reqData,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_MENU_ITEM_REQUEST})
        console.log("Request data being sent to backend:", reqData);


        try {
            const {data}=await api.post(`/api/admin/menu`, reqData,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            });
            console.log("menu item created", data);
            dispatch({type:CREATE_MENU_ITEM_SUCCESS, payload:data})

            dispatch({type:SHOW_NOTIFICATION, 
                payload:{message:"Menu item created", severity:"success"}
            })

            
        } catch (error) {
            dispatch({type:CREATE_MENU_ITEM_FAILURE, payload:error})
            dispatch({type:SHOW_NOTIFICATION, 
                payload:{message:"Failed to create menu item ", severity:"error"}
            })

            console.log("error", error);
        }
    }
}

export const getMenuItemByRestaurentId=({restaurentId,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:GET_MENU_ITEMS_BY_RESTAURENT_ID_REQUEST})

        try {
            const {data}=await api.get(`/api/restaurants/menu/${restaurentId}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
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
            const{data}=await api.put(`api/admin/restaurant/menu/${foodId}/availability`,{},{
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
            const {data}=await api.get(`/api/admin/restaurant/${id}/menu`,{
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

export const getMenuItemByCategory=({id,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:GET_MENU_ITEM_BY_CATEGORY_REQUEST})

        try {
            const {data}=await api.get(`/api/admin/preDefineMenuItem/category/${id}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
            });
            console.log("Menu item by category", data);
            dispatch({type:GET_MENU_ITEM_BY_CATEGORY_SUCCESS, payload:data})

        } catch (error) {

            dispatch({type:GET_MENU_ITEM_BY_CATEGORY_FAILURE, payload:error})
            console.log("error", error);
            
            
        }

    }
}


