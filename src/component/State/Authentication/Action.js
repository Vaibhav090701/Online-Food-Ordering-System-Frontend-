import { ADD_TO_FAVOURITE_FAILURE, ADD_TO_FAVOURITE_REQUEST, ADD_TO_FAVOURITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import { API_URL, api } from "../../config/api";
import { SHOW_NOTIFICATION } from "../Notification/ActionType";
import { useNavigate } from "react-router-dom";

export const registerUser=(reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})

    try {
        //pass the url of backend api in data and reqdata is a body which contain the userdata from the front end
        const{data}=await api.post(`${API_URL}/auth/signup`,reqData.userData);

        //store the jwt token which receive from backend in localstorage of system
        if(data.token)localStorage.setItem("jwt", data.token);

        //if user is registered as restaurent_owner role then we will navigate  it to admin/restaurent api
        if(data.role==="ROLE_RESTAURANT_OWNER"){
            reqData.navigate("/admin/restaurents")
        }
        else{
             reqData.navigate("/");                                       
        }
        dispatch({type:REGISTER_SUCCESS, payload:data.jwt})
        console.log("registeration success", data);

    } catch (error) {
        dispatch({type:REGISTER_FAILURE, payload:error})
        console.log("error",error);
        
    }
}

export const loginUser=(reqData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})

    try {
        //pass the url of backend api in data and reqdata is a body which contain the userdata from the front end
        const{data}=await api.post(`${API_URL}/auth/signin`,reqData.userData);

        //store the jwt token which receive from backend in localstorage of system
        if(data.token)localStorage.setItem("jwt", data.token);

        //if user is registered as restaurent_owner role then we will navigate  it to admin/restaurent api
        
        if(data.role==="ROLE_ADMIN"){
            setTimeout(()=>{
                reqData.navigate("/admin/restaurents")
            },2000)
        }
        else{
            setTimeout(() => {
                reqData.navigate("/");
            }, 2000); // Wait for 2 seconds before navigating
                }
        dispatch({type:LOGIN_SUCCESS, payload:data.jwt})
        console.log("login success",data);

                      // Trigger success notification
                      dispatch({
                        type: SHOW_NOTIFICATION,
                        payload: { message: 'Login successfull!', severity: 'success' }
                    }); 
        

    } catch (error) {
        dispatch({type:LOGIN_FAILURE, payload:error})
        console.log("error",error);

         // Trigger error notification
        dispatch({
            type: SHOW_NOTIFICATION,
                payload: { message: 'Login Failed. Please try again!', severity: 'error' }
            });
        
    }
}

export const getUser=(jwt)=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})

    try {
        //here we created api instance, when we are using api instance we don't need to provide API_URL
        const{data}=await api.get(`/api/users/profile`,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        });
        //we don't receive any jwt here
        dispatch({type:GET_USER_SUCCESS, payload:data})
        console.log("user profile",data);

    } catch (error) {
        dispatch({type:GET_USER_FAILURE, payload:error})
        console.log("error",error);
    }
}

export const addToFavouriter=({jwt,restaurentId})=>async(dispatch)=>{
    dispatch({type:ADD_TO_FAVOURITE_REQUEST})
    try {
        //pass the url of backend api in data and body is mandatory and we can pass empty body{} also/
        const{data}=await api.put(`/api/restaurants/${restaurentId}/add-favourites`,{},{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        });

        dispatch({type:ADD_TO_FAVOURITE_SUCCESS, payload:data})
        console.log("added to favourite",data);

    } catch (error) {
        dispatch({type:ADD_TO_FAVOURITE_FAILURE, payload:error})
        console.log("error",error);
    }
}

export const logout=()=>async(dispatch)=>{
    try {
        localStorage.clear();
        dispatch({type:LOGOUT})
        console.log("logout successfull");

    } catch (error) {
        console.log("error",error);
        
    }
}