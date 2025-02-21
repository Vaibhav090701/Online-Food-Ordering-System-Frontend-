import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS, CREATE_RESTAURENT_FAILURE, CREATE_RESTAURENT_REQUEST, CREATE_RESTAURENT_SUCCESS, DELETE_RESTAURENT_FAILURE, DELETE_RESTAURENT_REQUEST, DELETE_RESTAURENT_SUCCESS, GET_ALL_RESTAURENTS_FAILURE, GET_ALL_RESTAURENTS_REQUEST, GET_ALL_RESTAURENTS_SUCCESS, GET_RESTAURENTS_CATEGORY_FAILURE, GET_RESTAURENTS_CATEGORY_REQUEST, GET_RESTAURENTS_CATEGORY_SUCCESS, GET_RESTAURENT_BY_ID_FAILURE, GET_RESTAURENT_BY_ID_REQUEST, GET_RESTAURENT_BY_ID_SUCCESS, GET_RESTAURENT_BY_USER_ID_FAILURE,GET_RESTAURENT_BY_USER_ID_SUCCESS, UPDATE_RESTAURENT_FAILURE, UPDATE_RESTAURENT_REQUEST, UPDATE_RESTAURENT_STATUS_SUCCESS, UPDATE_RESTAURENT_SUCCESS } from "./ActionType";
const initialState={
    restaurents:[],
    userRestaurent:null,
    restaurent:null,
    events:[],
    restaurentEvents:[],
    categories:[],
    error:null,
    isLoading:false,
}

export const restaurentReducer=(state=initialState,action)=>{

    switch (action.type) {
        case CREATE_RESTAURENT_REQUEST:
        case GET_ALL_RESTAURENTS_REQUEST:
        case DELETE_RESTAURENT_REQUEST:
        case UPDATE_RESTAURENT_REQUEST:
        case GET_RESTAURENT_BY_ID_REQUEST:
        case CREATE_CATEGORY_REQUEST:
        case GET_RESTAURENTS_CATEGORY_REQUEST:
            return{
                ...state,
                isLoading:true,
                error:null,

            };
        case CREATE_RESTAURENT_SUCCESS:
            return{
                ...state,
                isLoading:false,
                userRestaurent:action.payload,

            };
        case GET_ALL_RESTAURENTS_SUCCESS:
            return{
                ...state,
                isLoading:false,
                restaurents:action.payload || action.payload.restaurents,
                error:null
            };

        case GET_RESTAURENT_BY_ID_SUCCESS:
            return{
                ...state,
                isLoading:false,
                restaurent:action.payload
            };

        case GET_RESTAURENT_BY_USER_ID_SUCCESS:
        case UPDATE_RESTAURENT_STATUS_SUCCESS:
        case UPDATE_RESTAURENT_SUCCESS:
            return {
                ...state,
                isLoading:false,
                userRestaurent:action.payload
            };
            
        case DELETE_RESTAURENT_SUCCESS:
            return{
                ...state,
                isLoading:false,
                restaurents:state.restaurents.filter((item)=>item.id!==action.payload),
                userRestaurent:state.userRestaurent.filter((item)=>item.id!==action.payload)
            };

        case CREATE_CATEGORY_SUCCESS:
            return{
                ...state,
                isLoading:false,
                categories:[...state.categories, action.payload],
            };

        case GET_RESTAURENTS_CATEGORY_SUCCESS:
            return{
                ...state,
                isLoading:false,
                categories:action.payload,
            };

        case CREATE_RESTAURENT_FAILURE:
        case GET_ALL_RESTAURENTS_FAILURE:
        case DELETE_RESTAURENT_FAILURE:
        case UPDATE_RESTAURENT_FAILURE:
        case GET_RESTAURENT_BY_ID_FAILURE:
        case CREATE_CATEGORY_FAILURE:
        case GET_RESTAURENTS_CATEGORY_FAILURE:
            return{
                ...state,
                isLoading:false,
                error:action.payload
            }
        case GET_RESTAURENT_BY_USER_ID_FAILURE:
            return{...state, isLoading:false, userRestaurent:action.payload}
    
        default:
            return state;
    }
}