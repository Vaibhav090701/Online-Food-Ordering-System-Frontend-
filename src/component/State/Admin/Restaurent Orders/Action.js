import { api } from "../../../config/api";
import { GET_RESTAURENT_ORDERS_FAILURE, GET_RESTAURENT_ORDERS_REQUEST, GET_RESTAURENT_ORDERS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionTypes"

export const getRestaurentOrders=({restaurentId,orderStatus,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURENT_ORDERS_REQUEST})

        try {
            const {data}=await api.get(`api/admin/order/restaurent/${restaurentId}`,{
                //in the backend if you use @RequestParam annotation, so you need to pass te data in the param object from frontend, and the 
                //variable name should be same in frontend and backend.
                params:{order_status:orderStatus},
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
            });

            console.log("restaurent orders", data);
            dispatch({type:GET_RESTAURENT_ORDERS_SUCCESS, payload:data})
            
        } catch (error) {
            dispatch({type:GET_RESTAURENT_ORDERS_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const updateOrderStatus=({orderStatus, orderId, jwt})=>{
    return async(dispatch)=>{
        dispatch({type:UPDATE_ORDER_STATUS_REQUEST})

        try {
            const {data}=await api.put(`/api/admin/order/${orderId}/${orderStatus}`,{},{
                headers:{
                    Authorization:`BEarer ${jwt}`,
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