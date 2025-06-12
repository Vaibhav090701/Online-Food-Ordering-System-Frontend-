import { CREATE_MENU_CATEGORY_FAILURE, CREATE_MENU_CATEGORY_REQUEST, CREATE_MENU_CATEGORY_SUCCESS, DELETE_MENU_CATEGORY_FAILURE, DELETE_MENU_CATEGORY_SUCCESS, GET_ALL_MENU_CATEGORIES_FAILURE, GET_ALL_MENU_CATEGORIES_REQUEST, GET_ALL_MENU_CATEGORIES_SUCCESS, GET_RESTAURANT_MENU_CATEGORIES_FAILURE, GET_RESTAURANT_MENU_CATEGORIES_SUCCESS, UPDATE_MENU_CATEGORY_FAILURE, UPDATE_MENU_CATEGORY_SUCCESS} from "./ActionType";

const intitalValues={
    menuCategories:[],
    menuCategory:null,
    isLoading:false,
    success:'',
    error:''
}

export const menuCategoryReducer=(state=intitalValues, action)=>{
    switch (action.type) {
        case CREATE_MENU_CATEGORY_REQUEST:
        case GET_ALL_MENU_CATEGORIES_REQUEST:
            return{...state, isLoading:true}

        case CREATE_MENU_CATEGORY_SUCCESS:
            return{...state, isLoading:false, menuCategory:action.payload};

        case GET_ALL_MENU_CATEGORIES_SUCCESS:
        case GET_RESTAURANT_MENU_CATEGORIES_SUCCESS:
            return { ...state, menuCategories: action.payload, loading: false, error: null };
        case UPDATE_MENU_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.map(cat =>
                    cat.id === action.payload.id ? action.payload : cat
                ),
                loading: false,
                error: null
            };
        case DELETE_MENU_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: state.categories.filter(cat => cat.id !== action.payload),
                loading: false,
                error: null
            };
        case CREATE_MENU_CATEGORY_FAILURE:
        case GET_ALL_MENU_CATEGORIES_FAILURE:
        case GET_RESTAURANT_MENU_CATEGORIES_FAILURE:
        case UPDATE_MENU_CATEGORY_FAILURE:
        case DELETE_MENU_CATEGORY_FAILURE:
            return { ...state, loading: false, error: action.payload.message };            
        default:
            return state;
    }
}