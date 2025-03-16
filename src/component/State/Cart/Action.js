import { api} from "../../config/api";
import { ADD_ITEM_TO_CART_FAILURE, ADD_ITEM_TO_CART_REQUEST, ADD_ITEM_TO_CART_SUCCESS, CLEARE_CART_FAILURE, CLEARE_CART_REQUEST, CLEARE_CART_SUCCESS, FIND_CART_FAILURE, FIND_CART_REQUEST, FIND_CART_SUCCESS, GET_ALL_CART_ITEMS_FAILURE, GET_ALL_CART_ITEMS_REQUEST, GET_ALL_CART_ITEMS_SUCCESS, REMOVE_CART_ITEM_FAILURE, REMOVE_CART_ITEM_REQUEST, REMOVE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE, UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS } from "./ActionType";

export const addItemToCart=(reqData)=>{
    return async(dispatch)=>{
        dispatch({type:ADD_ITEM_TO_CART_REQUEST})

        try {
            const {data}=await api.post(`/api/cart/add`,reqData.cartItem,{
                headers:{
                    Authorization:`Bearer ${reqData.token}`
                },
            });

            console.log("item added to cart", data);
            dispatch({type:ADD_ITEM_TO_CART_SUCCESS, payload:data})
            
        } catch (error) {
            dispatch({type:ADD_ITEM_TO_CART_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const findCart=(token)=>{
    return async(dispatch)=>{
        dispatch({type:FIND_CART_REQUEST})

        try {
            const {data}=await api.get(`/api/cart`,{
                headers:{
                    Authorization:`Bearer ${token}`
                },
            });
            console.log("cart found", data);
            dispatch({type:FIND_CART_SUCCESS, payload:data})
        } catch (error) {
            dispatch({type:FIND_CART_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const getAllCartItems=(reqData)=>{
    return async(dispatch)=>{
        dispatch({type:GET_ALL_CART_ITEMS_REQUEST})

        try {
            //create api in backend
            const {data}=await api.get(`/api/carts/${reqData.cartId}/items`,{
                headers:{
                    Authorization:`Bearer ${reqData.token}`
                },
            });
            console.log("all cart items", data);
            dispatch({type:GET_ALL_CART_ITEMS_SUCCESS, payload:data})
        } catch (error) {
            dispatch({type:GET_ALL_CART_ITEMS_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const updateCartItem=({id,quantity,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:UPDATE_CART_ITEM_REQUEST})

        try {
            const {data}=await api.put(`/api/cart/update/${id}`,null,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
                params:{
                    quantity:quantity,
                },
            });

            console.log("update cart", data);
            dispatch({type:UPDATE_CART_ITEM_SUCCESS, payload:data})

            dispatch(findCart(jwt));
            
        } catch (error) {
            dispatch({type:UPDATE_CART_ITEM_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const removeCartItem=({cartItemId,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:REMOVE_CART_ITEM_REQUEST})

        try {
            const {data}=await api.delete(`/api/cart/remove/${cartItemId}`,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                },
            });
            console.log("item removed", data);
            dispatch({type:REMOVE_CART_ITEM_SUCCESS, payload:data})
        } catch (error) {
            dispatch({type:REMOVE_CART_ITEM_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const clearCart=()=>{
    return async(dispatch)=>{
        dispatch({type:CLEARE_CART_REQUEST})

        try {
            const {data}=await api.put(`/api/cart/clear`,{},{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`
                },
            });
            console.log("Cart cleared", data);
            dispatch({type:CLEARE_CART_SUCCESS, payload:data})
        } catch (error) {
            dispatch({type:CLEARE_CART_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

