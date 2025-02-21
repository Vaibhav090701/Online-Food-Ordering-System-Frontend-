import { LOGOUT } from "../Authentication/ActionType";
import { ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, CLEARE_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_REQUEST, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType";

const initialState = {
    cart: null,
    cartItems: [],
    error: null,
    isLoading: false,
    success: null
  };
  
  export const cartReducer = (state = initialState, action) => {
    console.log('Action:', action); // Log the action
    console.log('State before:', state); // Log the state before changes
  
    switch (action.type) {
      case FIND_CART_REQUEST:
      case GET_ALL_CART_ITEMS_REQUEST:
      case UPDATE_CART_ITEM_REQUEST:
      case REMOVE_CART_ITEM_REQUEST:
        return {
          ...state,
          isLoading: true,
        };
      case FIND_CART_SUCCESS:
      case CLEARE_CART_SUCCESS:
        return {
          ...state,
          isLoading: false,
          cart: action.payload,
          cartItems: action.payload.item || [], // Ensure cartItems is always an array
        };
      case ADD_ITEM_TO_CART_SUCCESS:
        return {
          ...state,
          isLoading: false,
          cartItems: [action.payload, ...state.cartItems],
        };
      case UPDATE_CART_ITEM_SUCCESS:
        return {
          ...state,
          isLoading: false,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id ? action.payload : item
          ),
        };
      case REMOVE_CART_ITEM_SUCCESS:
        return {
          ...state,
          isLoading: false,
          cartItems: state.cartItems.filter((item) => item.id !== action.payload),
        };
      case FIND_CART_FAILURE:
      case REMOVE_CART_ITEM_FAILURE:
      case UPDATE_CART_ITEM_FAILURE:
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      case LOGOUT:
        return {
          ...state,
          isLoading: false,
          cart: null,
          cartItems: [],
          success: "login seccessfull",
        };
      default:
        return state;
    }
  };
  
  // Log the initial state
  console.log('Initial state:', initialState);
  