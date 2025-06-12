import { CREATE_ADDRESS_FAILURE, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS, GET_ALL_ADDRESS_FAILURE, GET_ALL_ADDRESS_REQUEST, GET_ALL_ADDRESS_SUCCESS, UPDATE_ADDRESS_DEFAULT_FAILURE, UPDATE_ADDRESS_DEFAULT_REQUEST, UPDATE_ADDRESS_DEFAULT_SUCCESS } from "./ActionType";

const initialState={
    addresses:[],
    address:null,
    isLoading:false,
    success:null,
    error:null
};

export const addressReducer=(state=initialState, action)=>{

    switch (action.type) {
        case CREATE_ADDRESS_REQUEST:
        case GET_ALL_ADDRESS_REQUEST:
        case UPDATE_ADDRESS_DEFAULT_REQUEST:
            return{...state, isLoading:true};

        case CREATE_ADDRESS_SUCCESS:
            return{...state, isLoading:false, address:action.payload};

        case GET_ALL_ADDRESS_SUCCESS:
            return{...state, addresses:action.payload, isLoading:false};

        case UPDATE_ADDRESS_DEFAULT_SUCCESS:
            return{...state, address:action.payload, isLoading:false};

        case CREATE_ADDRESS_FAILURE:
        case GET_ALL_ADDRESS_FAILURE:
        case UPDATE_ADDRESS_DEFAULT_FAILURE:
            return{...state, isLoading:false, error:action.payload};

        default:
            return state;
    
    }

}