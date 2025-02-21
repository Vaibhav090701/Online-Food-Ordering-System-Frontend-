import { api } from "../../config/api";
import { CREATE_EVENTS_FAILURE, CREATE_EVENTS_REQUEST, CREATE_EVENTS_SUCCESS, DELETE_EVENTS_FAILURE, DELETE_EVENTS_REQUEST, DELETE_EVENTS_SUCCESS, GET_ALL_EVENTS_FAILURE, GET_ALL_EVENTS_REQUEST, GET_ALL_EVENTS_SUCCESS, GET_RESTAURENTS_EVENTS_FAILURE, GET_RESTAURENTS_EVENTS_REQUEST, GET_RESTAURENTS_EVENTS_SUCCESS } from "./ActionTypes";

export const createEvent=({data,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:CREATE_EVENTS_REQUEST})

        try {
            const res=await api.post('/api/admin/event',data,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            });
            console.log("event created", res.data);
            dispatch({type:CREATE_EVENTS_SUCCESS, payload:res.data})
            
        } catch (error) {
            dispatch({type:CREATE_EVENTS_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const getAllEvents=(jwt)=>{
    return async(dispatch)=>{
        dispatch({type:GET_ALL_EVENTS_REQUEST})

        try {
            const res=await api.get(`/api/events`,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            });
            console.log("get all events", res.data);
            dispatch({type:GET_ALL_EVENTS_SUCCESS, payload:res.data})
            
        } catch (error) {
            dispatch({type:GET_ALL_EVENTS_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const deleteEvents=({eventId,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:DELETE_EVENTS_REQUEST})

        try {
            const res=await api.delete(`/api/admin/event/${eventId}/delete`,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            });
            console.log("event deleted", res.data);
            dispatch({type:DELETE_EVENTS_SUCCESS, payload:res.data})
            
        } catch (error) {
            dispatch({type:DELETE_EVENTS_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}

export const getRestaurentsEvents=({restaurentId,jwt})=>{
    return async(dispatch)=>{
        dispatch({type:GET_RESTAURENTS_EVENTS_REQUEST})

        try {
            const res=await api.get(`/api/admin/event/${restaurentId}/restaurent`,{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                }
            });
            console.log("get restaurent event", res.data);
            dispatch({type:GET_RESTAURENTS_EVENTS_SUCCESS, payload:res.data})
            
        } catch (error) {
            dispatch({type:GET_RESTAURENTS_EVENTS_FAILURE, payload:error})
            console.log("error", error);
        }
    }
}