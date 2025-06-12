import { mapEasingToNativeEasing } from "framer-motion";
import { api } from "../../../config/api";
import { SHOW_NOTIFICATION } from "../../Notification/ActionType";
import { GET_RESTAURENT_ORDERS_FAILURE, GET_RESTAURENT_ORDERS_REQUEST, GET_RESTAURENT_ORDERS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionTypes"

// export const getRestaurentOrders=({status = 'ALL', page = 0, limit = 10})=>{
//     return async(dispatch)=>{
//         dispatch({type:GET_RESTAURENT_ORDERS_REQUEST})

//         console.log("Status being sent to the backend:", status);

//         try {
//             const {data}=await api.get(`/admin/restaurant/orders`,{
//                 //in the backend if you use @RequestParam annotation, so you need to pass te data in the param object from frontend, and the 
//                 //variable name should be same in frontend and backend.
//                 params:{
//                     status,  // filter by status
//                     page,    // pagination: page number
//                     sizze:limit,   // pagination: number of items per page
//                 },
//             });

//             console.log("restaurent orders", data);
//             dispatch({type:GET_RESTAURENT_ORDERS_SUCCESS, payload:data.content})
            
//         } catch (error) {
//             dispatch({type:GET_RESTAURENT_ORDERS_FAILURE, payload:error})
//             console.log("error", error);
//         }
//     }
// }

export const updateOrderStatus=(orderStatus, orderId)=>{
    return async(dispatch)=>{
        dispatch({type:UPDATE_ORDER_STATUS_REQUEST})

        try {
            const {data}=await api.put(`/admin/restaurant/status/${orderId}`,null,{
                params:{
                    status:`${orderStatus}`,    
                },
            });

            if(data.success){

                dispatch({type:SHOW_NOTIFICATION,
                    payload:{message:data.message || "Status updated successfully", severity:"success"}
                })
                dispatch({type:UPDATE_ORDER_STATUS_SUCCESS, payload:data.data})

            }else{
                  dispatch({type:SHOW_NOTIFICATION,
                    payload:{message:data.message || "Failed to update status!!!", severity:"error"}
                })
                            dispatch({type:UPDATE_ORDER_STATUS_FAILURE, payload:data.data})

            }

        } catch (error) {

                dispatch({type:SHOW_NOTIFICATION,
                    payload:{message:data.message || "Failed to update status!!!", severity:"error"}
                })

            dispatch({type:UPDATE_ORDER_STATUS_FAILURE, payload:error})
            console.log("error",error);
        }
    }
}