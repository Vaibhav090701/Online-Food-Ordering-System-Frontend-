import { stepButtonClasses } from "@mui/material";
import { searchMenuItem } from "./Action";
import { CREATE_MENU_ITEM_FAILURE, CREATE_MENU_ITEM_REQUEST, CREATE_MENU_ITEM_SUCCESS, DELETE_MENU_ITEM_FAILURE, DELETE_MENU_ITEM_REQUEST, DELETE_MENU_ITEM_SUCCESS, GET_MENU_ITEM_BY_CATEGORY_FAILURE, GET_MENU_ITEM_BY_CATEGORY_REQUEST, GET_MENU_ITEM_BY_CATEGORY_SUCCESS, GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE, GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST, GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS, GET_RESTAURENT_MENU_FAILURE, GET_RESTAURENT_MENU_REQUEST, GET_RESTAURENT_MENU_SUCCESS, SEARCH_MENU_ITEM_FAILURE, SEARCH_MENU_ITEM_REQUEST, SEARCH_MENU_ITEM_SUCCESS, UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE, UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST, UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS } from "./ActionType";

const initialState={
    menuItems:[],
    search:[],
    isLoading:false,
    success:null,
    error:null,
    message:null

}

export const menuItemReducer=(state=initialState,action)=>{

    switch (action.type) {
        case CREATE_MENU_ITEM_REQUEST:
        case GET_MENU_ITEMS_BY_RESTAURANT_ID_REQUEST:
        case DELETE_MENU_ITEM_REQUEST:
        case SEARCH_MENU_ITEM_REQUEST:
        case UPDATE_MENU_ITEMS_AVAILABILITY_REQUEST:
        case GET_RESTAURENT_MENU_REQUEST:
        case GET_MENU_ITEM_BY_CATEGORY_REQUEST:
            return {
                ...state,
                isLoading:true,
            };

        case CREATE_MENU_ITEM_SUCCESS:
            return{
                ...state,
                isLoading:false,
                menuItems:[...state.menuItems, action.payload],
                message:"Food Created Successfully...",
            };
        case GET_MENU_ITEMS_BY_RESTAURANT_ID_SUCCESS:
            return {
                ...state,
                isLoading:false,
                menuItems:action.payload,
            };
        case DELETE_MENU_ITEM_SUCCESS:
            return{
                ...state,
                isLoading:false,
                message:action.payload
            };
        case UPDATE_MENU_ITEMS_AVAILABILITY_SUCCESS:
            return{
                ...state,
                isLoading:false,
                //here we are checking the id of each menu item, if item id and our updated item id(action.payload.id) is matched then it will get replaced else no change
                menuItems:state.menuItems.map((item)=>item.id===action.payload.id?action.payload:item),
            };

        case GET_RESTAURENT_MENU_SUCCESS:
            return {
                ...state,
                isLoading:false,
                menuItems:action.payload,
            };
    
        case SEARCH_MENU_ITEM_SUCCESS:
            return{
                ...state,
                isLoading:false,
                search:action.payload,
            };

        case GET_MENU_ITEM_BY_CATEGORY_SUCCESS:
            return{
                ...state,
                isLoading:false,
                menuItems:action.payload
            };
        case CREATE_MENU_ITEM_FAILURE:
        case GET_MENU_ITEMS_BY_RESTAURANT_ID_FAILURE:
        case UPDATE_MENU_ITEMS_AVAILABILITY_FAILURE:
        case DELETE_MENU_ITEM_FAILURE:
        case SEARCH_MENU_ITEM_FAILURE:
        case GET_RESTAURENT_MENU_FAILURE:
        case GET_MENU_ITEM_BY_CATEGORY_FAILURE:
            return{
                ...state,
                isLoading:false,
                error:action.payload,
                message:null
            };
                
        default:
            return state;
    }
}