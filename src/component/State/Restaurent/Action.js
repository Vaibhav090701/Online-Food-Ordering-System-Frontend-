import { api } from "../../config/api";
import { SHOW_NOTIFICATION } from "../Notification/ActionType";
import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_RESTAURENT_FAILURE, CREATE_RESTAURENT_REQUEST, CREATE_RESTAURENT_SUCCESS, DELETE_RESTAURENT_FAILURE, DELETE_RESTAURENT_REQUEST, DELETE_RESTAURENT_SUCCESS, GET_ALL_RESTAURENTS_FAILURE, GET_ALL_RESTAURENTS_REQUEST, GET_ALL_RESTAURENTS_SUCCESS, GET_RESTAURENTS_CATEGORY_FAILURE, GET_RESTAURENTS_CATEGORY_REQUEST, GET_RESTAURENTS_CATEGORY_SUCCESS, GET_RESTAURENT_BY_CITY_FAILURE, GET_RESTAURENT_BY_CITY_REQUEST, GET_RESTAURENT_BY_CITY_SUCCESS, GET_RESTAURENT_BY_ID_FAILURE, GET_RESTAURENT_BY_ID_REQUEST, GET_RESTAURENT_BY_ID_SUCCESS, GET_RESTAURENT_BY_USER_ID_FAILURE, GET_RESTAURENT_BY_USER_ID_REQUEST, GET_RESTAURENT_BY_USER_ID_SUCCESS,UPDATE_RESTAURENT_FAILURE, UPDATE_RESTAURENT_REQUEST, UPDATE_RESTAURENT_STATUS_FAILURE, UPDATE_RESTAURENT_STATUS_REQUEST, UPDATE_RESTAURENT_STATUS_SUCCESS, UPDATE_RESTAURENT_SUCCESS } from "./ActionType"

export const getAllRestaurents=()=>{
    return async (dispatch)=>{
    dispatch({type:GET_ALL_RESTAURENTS_REQUEST})
    try {
        const {data}=await api.get("/restaurants/all"); 
        dispatch({type:GET_ALL_RESTAURENTS_SUCCESS, payload:data.data});
        console.log("all restaurents", data);
        
    } catch (error) {
        dispatch({type:GET_ALL_RESTAURENTS_FAILURE, payload:error});
        console.log("error",error);
    }
};
}

export const getRestaurantByCity=(cityName)=>{
    return async (dispatch)=>{ 
        dispatch({type:GET_RESTAURENT_BY_CITY_REQUEST})
        try {
            const {data}=await api.get(`/restaurants/city/${cityName}`,{});
            console.log("Restarant by city", data);

            dispatch({type:GET_RESTAURENT_BY_CITY_SUCCESS, payload:data.data})
            
        } catch (error) {
            console.log("Error", error);
            dispatch({type:GET_RESTAURENT_BY_CITY_FAILURE, payload:error});            
        }
    }
}


export const getRestaurentById=({restaurentId})=>{
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURENT_BY_ID_REQUEST})
        try {
            const {data}=await api.get(`/restaurants/${restaurentId}`,{});
            console.log("Restaurents by Id", data);

            dispatch({type:GET_RESTAURENT_BY_ID_SUCCESS, payload:data.data})
            
        } catch (error) {
            dispatch({type:GET_RESTAURENT_BY_ID_FAILURE, payload:error})
            console.log("error", error);
            
        };
    };
}

export const getRestaurentByUserId=()=>{
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURENT_BY_USER_ID_REQUEST})

        try {
            const {data}=await api.get(`/admin/restaurant/user`,{});
            console.log("Restaurents by User Id", data);
            dispatch({type:GET_RESTAURENT_BY_USER_ID_SUCCESS, payload:data.data})
            
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'An unknown error occurred';
            dispatch({type: GET_RESTAURENT_BY_USER_ID_FAILURE, payload: errorMessage});
            console.log("error", errorMessage);
            
        }
    }
}

export const createRestaurent=({reqData})=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_RESTAURENT_REQUEST})
        try {
            const {data}=await api.post(`/admin/restaurant`, reqData);

            console.log("Restaurent created", data);
            dispatch({type:CREATE_RESTAURENT_SUCCESS, payload:data.data})

               // Trigger success notification
                                          dispatch({
                                            type: SHOW_NOTIFICATION,
                                            payload: { message: 'Restaurant registered successfull!', severity: 'success' }
                                        }); 
                    
            
        } catch (error) {
            dispatch({type:CREATE_RESTAURENT_FAILURE, payload:error})
            console.log("error", error);

              // Trigger error notification
                       dispatch({
                        type: SHOW_NOTIFICATION,
                            payload: { message: 'Restaurant registeration Failed. Please try again!', severity: 'error' }
                        });
                    
        }
    }

}

export const updateRestaurantInfo=({restaurentId,updatedInfo})=>{
    return async(dispatch)=>{
        dispatch({type:UPDATE_RESTAURENT_REQUEST})
        try {
            const {data}=await api.put(`/admin/restaurant/${restaurentId}`, updatedInfo);

            console.log("Restaurent details updated", data);
            dispatch({type:UPDATE_RESTAURENT_SUCCESS, payload:data.data})

                           // Trigger success notification
                           dispatch({
                            type: SHOW_NOTIFICATION,
                            payload: { message: 'Restaurant details updated successfull!', severity: 'success' }
                        }); 

            
        } catch (error) {
            dispatch({type:UPDATE_RESTAURENT_FAILURE, payload:error})
            console.log("error", error);

            // Trigger error notification
            dispatch({
                type: SHOW_NOTIFICATION,
                    payload: { message: 'Restaurant details failed to update. Please try again!', severity: 'error' }
                });
        }
    }
}

export const deleteRestaurent=({restaurentId})=>{
    return async(dispatch)=>{
        dispatch({type:DELETE_RESTAURENT_REQUEST})
        try {
            const res=await api.delete(`/admin/restaurents/${restaurentId}`,{});

            console.log("Restaurent deleted", res.data);
            dispatch({type:DELETE_RESTAURENT_SUCCESS, payload:res.data.data})
            
        } catch (error) {
            dispatch({type:DELETE_RESTAURENT_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const updateRestaurentStatus=({restaurentId})=>{
    return async(dispatch)=>{
        dispatch({type:UPDATE_RESTAURENT_STATUS_REQUEST})
        try {
            const res=await api.put(`/admin/restaurant/${restaurentId}/status`,{});

            console.log("Restaurent status updated", res.data);
            dispatch({type:UPDATE_RESTAURENT_STATUS_SUCCESS, payload:res.data.data})
            
        } catch (error) {
            dispatch({type:UPDATE_RESTAURENT_STATUS_FAILURE, payload:error})
            console.log("error", error);
        }
    }

}

export const createCategory=({reqData})=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_CATEGORY_REQUEST})

        try {
            const res=await api.post(`/admin/category`,reqData);
            console.log("category created ", res.data);
            dispatch({type:CREATE_CATEGORY_SUCCESS, payload:res.data.data})
            
        } catch (error) {
            dispatch({type:CREATE_CATEGORY_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

// export const getRestaurentsCategory=({restaurentId,jwt})=>{
//     return async(dispatch)=>{
//         dispatch({type:GET_RESTAURENTS_CATEGORY_REQUEST})

//         try {
//             const res=await api.get(`/api/category/restaurent/${restaurentId}`,{
//                 headers:{
//                     Authorization:`Bearer ${jwt}`,
//                 }
//             });
//             console.log("get restaurent category", res.data);
//             dispatch({type:GET_RESTAURENTS_CATEGORY_SUCCESS, payload:res.data})
            
//         } catch (error) {
//             dispatch({type:GET_RESTAURENTS_CATEGORY_FAILURE, payload:error})
//             console.log("error",error);
//         }
//     }
// }








