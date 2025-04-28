import { CREATE_CATEGORY_FAILURE, CREATE_CATEGORY_REQUEST, CREATE_CATEGORY_SUCCESS } from "../Restaurent/ActionType";
import { DELETE_MENU_CATEGORY_SUCCESS, GET_ALL_MENU_CATEGORY_FAILURE, GET_ALL_MENU_CATEGORY_REQUEST, GET_ALL_MENU_CATEGORY_SUCCESS} from "./ActionType";

const intitalValues={
    menuCategories:[],
    menuCategory:null,
    isLoading:false,
    success:'',
    error:''
}

export const menuCategoryReducer=(state=intitalValues, action)=>{
    switch (action.type) {
        case CREATE_CATEGORY_REQUEST:
        case GET_ALL_MENU_CATEGORY_REQUEST:
            return{...state, isLoading:true}

        case CREATE_CATEGORY_SUCCESS:
            return{...state, isLoading:false, menuCategory:action.payload};

        case GET_ALL_MENU_CATEGORY_SUCCESS:
            return{...state, isLoading:false, menuCategories:action.payload};

        case DELETE_MENU_CATEGORY_SUCCESS:
            return{...state, menuCategories:state.menuCategories.filter(category=> category.id !==action.payload.id)}

        case CREATE_CATEGORY_FAILURE:
        case GET_ALL_MENU_CATEGORY_FAILURE:
            return{...state, isLoading:false, error:action.payload}
            
        default:
            return state;
    }
}