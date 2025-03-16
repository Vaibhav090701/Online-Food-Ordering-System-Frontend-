import { api } from "../../../config/api";
import { GET_RESTAURENT_ORDERS_FAILURE, GET_RESTAURENT_ORDERS_REQUEST, GET_RESTAURENT_ORDERS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionTypes"

export const getRestaurentOrders=({jwt, status = 'ALL', page = 0, limit = 10})=>{
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURENT_ORDERS_REQUEST})

        console.log("Status being sent to the backend:", status);

        try {
            const {data}=await api.get(`/api/admin/restaurant/orders`,{
                //in the backend if you use @RequestParam annotation, so you need to pass te data in the param object from frontend, and the 
                //variable name should be same in frontend and backend.
                headers:{
                    Authorization:`Bearer ${jwt}`
                },  
                params:{
                    status,  // filter by status
                    page,    // pagination: page number
                    sizze:limit,   // pagination: number of items per page
                },
            });

            console.log("restaurent orders", data);
            dispatch({type:GET_RESTAURENT_ORDERS_SUCCESS, payload:data.content})
            
        } catch (error) {
            dispatch({type:GET_RESTAURENT_ORDERS_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const updateOrderStatus=(orderStatus, orderId, jwt)=>{
    return async(dispatch)=>{
        dispatch({type:UPDATE_ORDER_STATUS_REQUEST})

        try {
            const {data}=await api.put(`/api/admin/restaurant/status/${orderId}`,{},{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
                params:{
                    status:`${orderStatus}`,    
                },
            });

            console.log("order status updated", data);
            dispatch({type:UPDATE_ORDER_STATUS_SUCCESS, payload:data})
            
        } catch (error) {
            dispatch({type:UPDATE_ORDER_STATUS_FAILURE, payload:error})
            console.log("error",error);
        }
    }
}