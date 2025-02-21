import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionTypes"
import { api } from "../../config/api";

export const createOrder = (reqData) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST });

        try {
            const { data } = await api.post(`/api/order`, reqData, {
                headers: {
                    Authorization: `Bearer ${reqData.jwt}`
                },
            });

            console.log("Order response data:", data);

            if (data.payment_url) {
                console.log("Redirecting to payment URL:", data.payment_url);
                window.location.href = data.payment_url;
            } else {
                console.log("No payment URL provided.");
            }

            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

        } catch (error) {
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
            console.log("Error creating order:", error);
        }
    }
}
export const getUserOrders=(jwt)=>{
    return async(dispatch)=>{
        dispatch({type:GET_USERS_ORDERS_REQUEST})

        try {

            const {data}=await api.get(`/api/order/user`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
            });

            console.log("user orders", data);
            dispatch({type:GET_USERS_ORDERS_SUCCESS, payload:data})
            
        } catch (error) {
            dispatch({type:GET_USERS_ORDERS_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}