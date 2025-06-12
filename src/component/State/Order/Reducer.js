import { CANCEL_ORDER_FAILURE, CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CREATE_ORDER_FAILURE, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, GET_ORDER_DETAILS_FAILURE, GET_ORDER_DETAILS_REQUEST, GET_ORDER_DETAILS_SUCCESS, GET_RESTAURANT_ORDERS_FAILURE, GET_RESTAURANT_ORDERS_REQUEST, GET_RESTAURANT_ORDERS_SUCCESS, GET_USERS_ORDERS_FAILURE, GET_USERS_ORDERS_REQUEST, GET_USERS_ORDERS_SUCCESS, UPDATE_ORDER_STATUS_FAILURE, UPDATE_ORDER_STATUS_SUCCESS} from "./ActionTypes";

const initialState={
    orders:[],
    order:null,
    restaurantOrders: { content: [], totalElements: 0 },
    isLoading:false,
    success:null,
    error:null,
}

export const orderReducer=(state=initialState,action)=>
{
    switch (action.type) {
case CREATE_ORDER_REQUEST:
        case GET_ORDER_DETAILS_REQUEST:
        case GET_USERS_ORDERS_REQUEST:
        case CANCEL_ORDER_REQUEST:
        case GET_RESTAURANT_ORDERS_REQUEST:
        case UPDATE_ORDER_STATUS_SUCCESS:            return{
                ...state,
                isLoading:true,
                error:null
            };
        case CREATE_ORDER_SUCCESS:
            return{...state, order:action.payload, isLoading:false};

        case GET_ORDER_DETAILS_SUCCESS:
            return { ...state, order: action.payload, loading: false, error: null };

        case GET_USERS_ORDERS_SUCCESS:
            return { ...state, orders: action.payload, loading: false, error: null };

        // case CANCEL_ORDER_SUCCESS:
        //     return {
        //         ...stateOrders: state.orders.map(order => order.id === action.payload.id ? action.payload : order),
        //         loading: false,
        //         error: null
        //     };

        case GET_RESTAURANT_ORDERS_SUCCESS:
            return { ...state, restaurantOrders: action.payload, loading: false, error: null };
            
        case UPDATE_ORDER_STATUS_SUCCESS:
            return {
                ...state, 
                restaurantOrders: {
                    ...state.restaurantOrders,
                    content: state.restaurantOrders.content.map(order => order.id === action.payload.id ? action.payload : order)
                },
                loading: false,
                error: null
            };
        case CREATE_ORDER_FAILURE:
        case GET_ORDER_DETAILS_FAILURE:
        case GET_USERS_ORDERS_FAILURE:
        case CANCEL_ORDER_FAILURE:
        case GET_RESTAURANT_ORDERS_FAILURE:
        case UPDATE_ORDER_STATUS_FAILURE:
            return { ...state, loading: false, error: action.payload.message };

    
        default:
            return state;
    }

}