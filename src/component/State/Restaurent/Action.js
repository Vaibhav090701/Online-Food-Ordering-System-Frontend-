import { api } from "../../config/api";
import { SHOW_NOTIFICATION } from "../Notification/ActionType";
import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_RESTAURENT_FAILURE, CREATE_RESTAURENT_REQUEST, CREATE_RESTAURENT_SUCCESS, DELETE_RESTAURENT_FAILURE, DELETE_RESTAURENT_REQUEST, DELETE_RESTAURENT_SUCCESS, GET_ALL_RESTAURENTS_FAILURE, GET_ALL_RESTAURENTS_REQUEST, GET_ALL_RESTAURENTS_SUCCESS, GET_RESTAURENTS_CATEGORY_FAILURE, GET_RESTAURENTS_CATEGORY_REQUEST, GET_RESTAURENTS_CATEGORY_SUCCESS, GET_RESTAURENT_BY_ID_FAILURE, GET_RESTAURENT_BY_ID_REQUEST, GET_RESTAURENT_BY_ID_SUCCESS, GET_RESTAURENT_BY_USER_ID_FAILURE, GET_RESTAURENT_BY_USER_ID_REQUEST, GET_RESTAURENT_BY_USER_ID_SUCCESS,UPDATE_RESTAURENT_FAILURE, UPDATE_RESTAURENT_REQUEST, UPDATE_RESTAURENT_STATUS_FAILURE, UPDATE_RESTAURENT_STATUS_REQUEST, UPDATE_RESTAURENT_STATUS_SUCCESS, UPDATE_RESTAURENT_SUCCESS } from "./ActionType"

export const getAllRestaurents=()=>{
    return async (dispatch)=>{
    dispatch({type:GET_ALL_RESTAURENTS_REQUEST})
    try {
        const {data}=await api.get("/api/restaurants");
        dispatch({type:GET_ALL_RESTAURENTS_SUCCESS, payload:data});
        console.log("all restaurents", data);
        
    } catch (error) {
        dispatch({type:GET_ALL_RESTAURENTS_FAILURE, payload:error});
        console.log("error",error);
    }
};
}

export const getRestaurentById=({restaurentId,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURENT_BY_ID_REQUEST})
        try {
            const {data}=await api.get(`/api/restaurants/${restaurentId}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            });
            console.log("Restaurents by Id", data);

            dispatch({type:GET_RESTAURENT_BY_ID_SUCCESS, payload:data})
            
        } catch (error) {
            dispatch({type:GET_RESTAURENT_BY_ID_FAILURE, payload:error})
            console.log("error", error);
            
        };
    };
}

export const getRestaurentByUserId=(token)=>{
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURENT_BY_USER_ID_REQUEST})

        try {
            const {data}=await api.get(`/api/admin/restaurant/user`,{
                headers:{
                    Authorization:`Bearer ${token}`,
                },
                maxRedirects: 5, // Set the maximum number of redirects you want to allow
            });
            console.log("Restaurents by User Id", data);
            dispatch({type:GET_RESTAURENT_BY_USER_ID_SUCCESS, payload:data})
            
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'An unknown error occurred';
            dispatch({type: GET_RESTAURENT_BY_USER_ID_FAILURE, payload: errorMessage});
            console.log("error", errorMessage);
            
        }
    }
}

export const createRestaurent=({reqData,token})=>{
    console.log("token:- ",token);
    return async(dispatch)=>{
        dispatch({type:CREATE_RESTAURENT_REQUEST})
        try {
            const {data}=await api.post(`/api/admin/restaurant`, reqData,{
                headers:{
                    Authorization:`Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });

            console.log("Restaurent created", data);
            dispatch({type:CREATE_RESTAURENT_SUCCESS, payload:data})

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

export const updateRestaurantInfo=({restaurentId,jwt,updatedInfo})=>{
    console.log("token:- ",jwt);
    return async(dispatch)=>{
        dispatch({type:UPDATE_RESTAURENT_REQUEST})
        try {
            const {data}=await api.put(`/api/admin/restaurant/${restaurentId}`, updatedInfo,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            });

            console.log("Restaurent details updated", data);
            dispatch({type:UPDATE_RESTAURENT_SUCCESS, payload:data})

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

export const deleteRestaurent=({restaurentId, jwt})=>{
    console.log("token:- ",jwt);
    return async(dispatch)=>{
        dispatch({type:DELETE_RESTAURENT_REQUEST})
        try {
            const res=await api.delete(`/api/admin/restaurents/${restaurentId}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            });

            console.log("Restaurent deleted", res.data);
            dispatch({type:DELETE_RESTAURENT_SUCCESS, payload:res.data})
            
        } catch (error) {
            dispatch({type:DELETE_RESTAURENT_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const updateRestaurentStatus=({restaurentId,jwt})=>{
    console.log("token:- ",jwt);
    return async(dispatch)=>{
        dispatch({type:UPDATE_RESTAURENT_STATUS_REQUEST})
        try {
            const res=await api.put(`/api/admin/restaurant/${restaurentId}/status`,{},{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            });

            console.log("Restaurent status updated", res.data);
            dispatch({type:UPDATE_RESTAURENT_STATUS_SUCCESS, payload:res.data})
            
        } catch (error) {
            dispatch({type:UPDATE_RESTAURENT_STATUS_FAILURE, payload:error})
            console.log("error", error);
        }
    }

}

export const createCategory=({reqData,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_CATEGORY_REQUEST})

        try {
            const res=await api.post(`/api/admin/category`,reqData,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            });
            console.log("category created ", res.data);
            dispatch({type:CREATE_CATEGORY_SUCCESS, payload:res.data})
            
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








