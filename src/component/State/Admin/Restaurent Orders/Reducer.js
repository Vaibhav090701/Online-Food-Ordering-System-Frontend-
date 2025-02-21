import { GET_RESTAURENT_ORDERS_FAILURE, GET_RESTAURENT_ORDERS_REQUEST, GET_RESTAURENT_ORDERS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_REQUEST, UPDATE_ORDER_STATUS_SUCCESS } from "./ActionTypes";

const initialState={
    orders:[],
    isLoading:false,
    error:null,
    success:null

}

export const restaurentOrderReducer=(state=initialState, action)=>{
    switch (action.type) {
        case GET_RESTAURENT_ORDERS_REQUEST:
        case UPDATE_ORDER_STATUS_REQUEST:
            return{
                ...state,
                isLoading:true,
                error:null
            };

        case GET_RESTAURENT_ORDERS_SUCCESS:
            return{
                ...state,
                isLoading:false,
                orders:action.payload
            };
        case UPDATE_ORDER_STATUS_SUCCESS:
            return{
                ...state,
                isLoading:false,
                //here need to change === to !==.
                orders:state.orders.map((item)=>item.id===action.payload.id?action.payload:item)
            };
        case GET_RESTAURENT_ORDERS_FAILURE:
        case UPDATE_ORDER_STATUS_FAILURE:
            return{
                ...state,
                isLoading:false,
                error:action.payload
            };

        default:
            return state;
    }
}