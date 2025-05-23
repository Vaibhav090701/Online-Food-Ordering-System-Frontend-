import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionTypes"
import { api } from "../../config/api";
import { Snackbar } from '@mui/material';
import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "../Notification/ActionType";


export const createOrder = ({jwt,reqData, navigate}) => {
    return async (dispatch) => {
        dispatch({ type: CREATE_ORDER_REQUEST });

        try {
            const { data } = await api.post(`/api/orders`, reqData, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
            });

            console.log("Order response data:", data);

            if (data.paymentResponse) {
                console.log("Redirecting to payment URL:", data.paymentResponse.payment_url);
                window.location.href = data.paymentResponse.payment_url;
            } else {
                console.log("No payment URL provided.");
            }

            dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

              // Trigger success notification
              dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: 'Order created successfully!', severity: 'success' }
            }); 

            if(navigate){
                navigate("/my-profile/orders")
            }

        } catch (error) {
            dispatch({ type: CREATE_ORDER_FAILURE, payload: error });
            console.log("Error creating order:", error);

                        // Trigger error notification
                        dispatch({
                            type: SHOW_NOTIFICATION,
                            payload: { message: 'Failed to create order. Please try again!', severity: 'error' }
                        });
            
        }
    }
}

  
export const getUserOrders=(jwt)=>{
    return async(dispatch)=>{
        dispatch({type:GET_USERS_ORDERS_REQUEST})

        try {

            const {data}=await api.get(`/api/orders/history`,{
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