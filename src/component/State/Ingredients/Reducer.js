import { CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, GET_ALL_PRE_DEFINE_INGREDIENT_FAILURE, GET_ALL_PRE_DEFINE_INGREDIENT_REQUEST, GET_ALL_PRE_DEFINE_INGREDIENT_SUCCESS,  GET_INGREDIENTS_FAILURE, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, UPDATE_INGREDIENT_REQUEST, UPDATE_INGREDIENT_SUCCESS, UPDATE_STOCK } from "./ActionTypes";

const initialState={
    ingredients:[],
    ingredient:null,
    update:null,
    category:[],
    error:null,
    isLoading:false
}

export const ingredientsReducer=(state=initialState,action)=>{

    switch (action.type) {
        case CREATE_INGREDIENT_REQUEST:
        case GET_INGREDIENTS_REQUEST:
        case UPDATE_INGREDIENT_REQUEST:
        case GET_ALL_PRE_DEFINE_INGREDIENT_REQUEST:
        return{
            ...state,
            isLoading:true,
            update:null
            };
        
        case GET_ALL_PRE_DEFINE_INGREDIENT_SUCCESS:
            return{
                ...state,
                isLoading:false,
                ingredients:action.payload
            };
        
        case GET_INGREDIENTS_SUCCESS:
            return{
                ...state,
                isLoading:false,
                ingredients:action.payload
            };
        case CREATE_INGREDIENT_SUCCESS:
            return{
                ...state,
                isLoading:false,
                ingredients:[...state.ingredients, action.payload],
            };

        case UPDATE_INGREDIENT_SUCCESS:
            return{
                ...state,
                isLoading:false,
                ingredient:action.payload,
                ingredients:state.ingredients.map((item)=>item.id===action.payload.id?action.payload:item),
            }
        
        case UPDATE_STOCK:
            return{
                ...state,
                isLoading:false,
                update:action.payload,
                ingredients:state.ingredients.map((item)=>item.id===action.payload.id?action.payload:item),
            };

        case GET_ALL_PRE_DEFINE_INGREDIENT_FAILURE:
        case GET_INGREDIENTS_FAILURE:
            return{
                ...state, isLoading:false, error:action.payload
            };

        default:
            return state;
    }
}