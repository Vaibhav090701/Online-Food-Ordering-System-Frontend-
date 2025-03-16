import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import { menuItemReducer } from "./Menu/Reducer";
import { orderReducer } from "./Order/Reducer";
import { cartReducer } from "./Cart/Reducer";
import { ingredientsReducer } from "./Ingredients/Reducer";
import { restaurentOrderReducer } from "./Admin/Restaurent Orders/Reducer";
import {restaurentReducer} from "./Restaurent/Reducer";
import { eventReducer } from "./Event/Reducer";
import { addressReducer } from "./Address/Reducer";
import notificationReducer from "./Notification/Reducer";

const rootereducer=combineReducers({
    auth:authReducer,
    restaurent:restaurentReducer,
    menu:menuItemReducer,
    cart:cartReducer,
    order:orderReducer,
    restaurentOrders:restaurentOrderReducer,
    ingredients:ingredientsReducer,
    event:eventReducer,
    address:addressReducer,
    notification:notificationReducer,
})

//here we create store by using redux 
export const store=legacy_createStore(rootereducer,applyMiddleware(thunk));