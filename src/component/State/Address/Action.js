import { api } from "../../config/api"
import { CREATE_ADDRESS_FAILURE, CREATE_ADDRESS_REQUEST, CREATE_ADDRESS_SUCCESS, GET_ALL_ADDRESS_FAILURE, GET_ALL_ADDRESS_REQUEST, GET_ALL_ADDRESS_SUCCESS } from "./ActionType"

export const createAddress=({reqData,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_ADDRESS_REQUEST})

        try {
            const {data}=await api.post("/api/addresses",reqData,{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            });
            console.log("Address created", data);
            dispatch({type:CREATE_ADDRESS_SUCCESS, payload:data})

        } catch (error){
            console.log("error", error);
            dispatch({type:CREATE_ADDRESS_FAILURE, payload:error})
            
        }
    }
}

export const getUsersAddress=(jwt)=>{
    return async(dispatch)=>{
        dispatch({type:GET_ALL_ADDRESS_REQUEST})

        try {
            const {data}=await api.get("/api/addresses",{
                headers:{
                    Authorization:`Bearer ${jwt}`
                }
            });
            console.log("User addresses", data);
            dispatch({type:GET_ALL_ADDRESS_SUCCESS, payload:data})

        } catch (error){
            console.log("error", error);
            dispatch({type:GET_ALL_ADDRESS_FAILURE, payload:error})
            
        }
    }
}