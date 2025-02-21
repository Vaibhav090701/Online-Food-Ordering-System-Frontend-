import { api } from "../../config/api";
import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_RESTAURENT_FAILURE, CREATE_RESTAURENT_REQUEST, CREATE_RESTAURENT_SUCCESS, DELETE_RESTAURENT_FAILURE, DELETE_RESTAURENT_REQUEST, DELETE_RESTAURENT_SUCCESS, GET_ALL_RESTAURENTS_FAILURE, GET_ALL_RESTAURENTS_REQUEST, GET_ALL_RESTAURENTS_SUCCESS, GET_RESTAURENTS_CATEGORY_FAILURE, GET_RESTAURENTS_CATEGORY_REQUEST, GET_RESTAURENTS_CATEGORY_SUCCESS, GET_RESTAURENT_BY_ID_FAILURE, GET_RESTAURENT_BY_ID_REQUEST, GET_RESTAURENT_BY_ID_SUCCESS, GET_RESTAURENT_BY_USER_ID_FAILURE, GET_RESTAURENT_BY_USER_ID_REQUEST, GET_RESTAURENT_BY_USER_ID_SUCCESS,UPDATE_RESTAURENT_FAILURE, UPDATE_RESTAURENT_REQUEST, UPDATE_RESTAURENT_STATUS_FAILURE, UPDATE_RESTAURENT_STATUS_REQUEST, UPDATE_RESTAURENT_STATUS_SUCCESS, UPDATE_RESTAURENT_SUCCESS } from "./ActionType"

export const getAllRestaurents=(token)=>{
    return async (dispatch)=>{
    dispatch({type:GET_ALL_RESTAURENTS_REQUEST})
    try {
        const {data}=await api.get("/api/restaurents",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        dispatch({type:GET_ALL_RESTAURENTS_SUCCESS, payload:data});
        console.log("all restaurents", data);
        
    } catch (error) {
        dispatch({type:GET_ALL_RESTAURENTS_FAILURE, payload:error});
        console.log("error",error);
    }
};
}

export const getRestaurentById=({jwt,restaurentId})=>{
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURENT_BY_ID_REQUEST})
        try {
            const {data}=await api.get(`/api/restaurents/${restaurentId}`,{
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
            const {data}=await api.get(`/api/admin/restaurents/user`,{
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

export const createRestaurent=(reqData)=>{
    console.log("token:- ",reqData.token);
    return async(dispatch)=>{
        dispatch({type:CREATE_RESTAURENT_REQUEST})
        try {
            const {data}=await api.post(`/api/admin/restaurents`, reqData.data,{
                headers:{
                    Authorization:`Bearer ${reqData.token}`,
                }
            });

            console.log("Restaurent created", data);
            dispatch({type:CREATE_RESTAURENT_SUCCESS, payload:data})
            
        } catch (error) {
            dispatch({type:CREATE_RESTAURENT_FAILURE, payload:error})
            console.log("error", error);
        }
    }

}

export const updateRestaurent=({restaurentData, restaurentId,jwt})=>{
    console.log("token:- ",jwt);
    return async(dispatch)=>{
        dispatch({type:UPDATE_RESTAURENT_REQUEST})
        try {
            const {data}=await api.put(`/api/admin/restaurents/${restaurentId}`, restaurentData,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            });

            console.log("Restaurent details updated", data);
            dispatch({type:UPDATE_RESTAURENT_SUCCESS, payload:data})
            
        } catch (error) {
            dispatch({type:UPDATE_RESTAURENT_FAILURE, payload:error})
            console.log("error", error);
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
            const res=await api.put(`/api/admin/restaurents/${restaurentId}/status`,{},{
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

export const getRestaurentsCategory=({restaurentId,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURENTS_CATEGORY_REQUEST})

        try {
            const res=await api.get(`/api/category/restaurent/${restaurentId}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            });
            console.log("get restaurent category", res.data);
            dispatch({type:GET_RESTAURENTS_CATEGORY_SUCCESS, payload:res.data})
            
        } catch (error) {
            dispatch({type:GET_RESTAURENTS_CATEGORY_FAILURE, payload:error})
            console.log("error",error);
        }
    }
}








