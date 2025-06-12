import { ADD_TO_FAVOURITE_FAILURE, ADD_TO_FAVOURITE_REQUEST, ADD_TO_FAVOURITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import { isPresentInFavourites } from "../../config/logic";

const initialState={
    user:null,
    isLoading:false,
    error:null,
    success:null,
    jwt:null,
    favourites:[]

}
export const authReducer=(state=initialState,action)=>{
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case ADD_TO_FAVOURITE_REQUEST:
            return {...state,isLoading:true, error:null, success:null};
            
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return {...state, isLoading:false, success:"Register success", user:action.payload};
        
        case GET_USER_SUCCESS:
             return {...state, isLoading:false, user:action.payload, favourites:action.payload.favourites};

        case LOGOUT:
            return {
        ...initialState,
        user: null,
        isAuthenticated: false,
      };
    
        case ADD_TO_FAVOURITE_SUCCESS:
            const favouritesList = Array.isArray(state.favourites) ? state.favourites : [];

            return{...state, isLoading:false, 
                //here we are checking if restaurent(action.payload) is already present inside favourites then remove it from that list, else add to the list 
  favourites: isPresentInFavourites(favouritesList, action.payload)
    ? favouritesList.filter((item) => item.id !== action.payload.id)
    : [action.payload, ...favouritesList],
  error: null,
};

        case REGISTER_FAILURE:
        case LOGIN_FAILURE:
        case GET_USER_FAILURE:
        case ADD_TO_FAVOURITE_FAILURE:
            return {...state,isLoading:false, error:action.payload, success:null};

        default:
            return state;
    }
}