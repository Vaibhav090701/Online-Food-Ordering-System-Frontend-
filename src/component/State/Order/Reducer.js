import { CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS } from "./ActionTypes";

const initialState={
    orders:[],
    isLoading:false,
    success:null,
    error:null
}

export const orderReducer=(state=initialState,action)=>
{
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
        case GET_USERS_ORDERS_REQUEST:
            return{
                ...state,
                isLoading:true,
                error:null
            };
        case GET_USERS_ORDERS_SUCCESS:
            return{
                ...state,
                isLoading:false,
                orders:action.payload
            };
        case CREATE_ORDER_FAILURE:
        case GET_USERS_ORDERS_FAILURE:
            return{
                ...state,
                isLoading:false,
                error:action.payload
            };
    
        default:
            return state;
    }

}