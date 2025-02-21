import { CREATE_INGREDIENT_CATEGORY_REQUEST, CREATE_INGREDIENT_CATEGORY_SUCCESS, CREATE_INGREDIENT_REQUEST, CREATE_INGREDIENT_SUCCESS, GET_INGREDIENTS, GET_INGREDIENT_CATEGORY_REQUEST, GET_INGREDIENT_CATEGORY_SUCCESS, UPDATE_STOCK } from "./ActionTypes";

const initialState={
    ingredients:[],
    update:null,
    category:[],
    error:null,
    isLoading:false
}

export const ingredientsReducer=(state=initialState,action)=>{

    switch (action.type) {
        case CREATE_INGREDIENT_REQUEST:
        case CREATE_INGREDIENT_CATEGORY_REQUEST:
        case GET_INGREDIENT_CATEGORY_REQUEST:
        return{
            ...state,
            isLoading:true,
            update:null
            };
        
        case GET_INGREDIENTS:
            return{
                ...state,
                isLoading:false,
                ingredients:action.payload
            };
        case GET_INGREDIENT_CATEGORY_SUCCESS:
            return{
                ...state,
                isLoading:false,
                category:action.payload
            };
        case CREATE_INGREDIENT_CATEGORY_SUCCESS:
            return{
                ...state,
                isLoading:false,
                category:[...state.category, action.payload],
            };
        case CREATE_INGREDIENT_SUCCESS:
            return{
                ...state,
                isLoading:false,
                ingredients:[...state.ingredients, action.payload],
            };
        
        case UPDATE_STOCK:
            return{
                ...state,
                isLoading:false,
                update:action.payload,
                ingredients:state.ingredients.map((item)=>item.id===action.payload.id?action.payload:item),
            };
                
        default:
            return state;
    }
}