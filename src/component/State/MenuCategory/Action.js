import { api } from "../../config/api"
import { SHOW_NOTIFICATION } from "../Notification/ActionType"
import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS } from "../Restaurent/ActionType"
import { DELETE_MENU_CATEGORY_REQUEST, DELETE_MENU_CATEGORY_SUCCESS, GET_ALL_MENU_CATEGORY_FAILURE, GET_ALL_MENU_CATEGORY_REQUEST, GET_ALL_MENU_CATEGORY_SUCCESS} from "./ActionType"

export const createMenuCategory=({jwt,reqData})=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_CATEGORY_REQUEST})

        try {
            const {data}=await api.post("/api/admin/restaurant/menu-category", reqData,{
                headers:{
                     Authorization:`Bearer ${jwt}`
                },
            });

            console.log("Menu category created", data);
            dispatch({type:CREATE_CATEGORY_SUCCESS, payload:data})

            dispatch({type:SHOW_NOTIFICATION, payload:{message:"Menu category created successfully!!!", severity:"success"}});
            dispatch(getRestaurantMenuCategories(jwt));

            
        } catch (error) {
            console.log("error", error);
            dispatch({type:CREATE_CATEGORY_FAILURE, payload:error})
            dispatch({
                type: SHOW_NOTIFICATION,
                    payload: { message: 'Failed to create menu category!', severity: 'error' }
                });   
        }
    }
}

export const getAllMenuCategories=(jwt)=>{
    return async(dispatch)=>{
        dispatch({type:GET_ALL_MENU_CATEGORY_REQUEST})

        try {
            const {data}=await api.get("/api/admin/restaurant/menu-category",{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
            });
            console.log("All Menu category", data);
            dispatch({type:GET_ALL_MENU_CATEGORY_SUCCESS, payload:data})
        } catch (error) {
            console.log("error", error);
            dispatch({type:GET_ALL_MENU_CATEGORY_FAILURE, payload:error})            
        }
    }
}

export const deleteMenuCategory=({jwt,id})=>{
    return async(dispatch)=>{
        dispatch({type:DELETE_MENU_CATEGORY_REQUEST})

        try {
            const {data}=await api.delete(`/api/admin/restaurant/menu-category/${id}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
            });

            console.log("Menu category deleted", data);

            dispatch({type:SHOW_NOTIFICATION,
                payload:{message:"Menu category deleted successfully!!!", severity: 'success'}
            })

            dispatch(getRestaurantMenuCategories(jwt));

            
        } catch (error) {

            console.log("error", error);
            
        }
    }
}