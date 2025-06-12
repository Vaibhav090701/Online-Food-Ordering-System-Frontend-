import { ADD_TO_FAVOURITE_FAILURE, ADD_TO_FAVOURITE_REQUEST, ADD_TO_FAVOURITE_SUCCESS, GET_USER_FAILURE, GET_USER_REQUEST, GET_USER_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./ActionType";
import { API_URL, api } from "../../config/api";
import { SHOW_NOTIFICATION } from "../Notification/ActionType";
import { useNavigate } from "react-router-dom";
import { showNotification } from "../Notification/Action";
import { toast } from 'react-toastify';


export const registerUser=(reqData)=>async(dispatch)=>{
    dispatch({type:REGISTER_REQUEST})
    
    try {
        // Make API call to the signup endpoint
        const response = await api.post(`/signup`, reqData.userData);

        // Extract ApiResponse fields
        const { success, data, message, status } = response.data;

        if(success){
            dispatch({
                type:REGISTER_SUCCESS,
                payload:data
            })
        console.log("registeration success", data);
        // Trigger success notification with backend message
            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: message || "Registration successful!", severity: "success" },
            });

            // Navigate based on user role
            setTimeout(() => {
                if (data.role === "ROLE_ADMIN") {
                    reqData.navigate("/admin/restaurants"); // Fixed typo in route
                } else {
                    reqData.navigate("/verify-otp");
                }
            }, 2000); // 2-second delay for notification visibility
        } else{
            // Handle unexpected case where success is false but no error thrown
            dispatch({
                type: REGISTER_FAILURE,
                payload: { message: message || "Registration failed. Please try again." },
            });

            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: message || "Registration failed. Please try again!", severity: "error" },
            });
            console.log("Registration failed with message:", message);
        }

    } catch (error) {
        // Extract error message from backend response if available
        let errorMessage = "Registration failed. Please try again!";
        if (error.response && error.response.data) {
            const { message, status } = error.response.data;
            errorMessage = message || errorMessage;

            // Handle specific error cases
            if (status === 409) {
                errorMessage = "Email or username already exists!";
            } else if (status === 400) {
                errorMessage = message || "Invalid input data. Please check your details.";
            }
        } else if (error.request) {
            errorMessage = "No response from server. Please check your network connection.";
        } else {
            errorMessage = error.message || errorMessage;
        }
        // Dispatch failure action
        dispatch({
            type: REGISTER_FAILURE,
            payload: { message: errorMessage },
        });

        // Trigger error notification
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" },
        });

        console.error("Registration error:", error);
    }
}

export const loginUser=(reqData)=>async(dispatch)=>{
    dispatch({type:LOGIN_REQUEST})

    try {
        //pass the url of backend api in data and reqdata is a body which contain the userdata from the front end
        const response=await api.post(`/signin`,reqData.userData);
        const { success, data, message, status } = response.data;

        if(success){

        dispatch({type:LOGIN_SUCCESS, payload:data})
        console.log("login success",data);

           // Trigger success notification
                      dispatch({
                        type: SHOW_NOTIFICATION,
                payload: { message: message || "Login successful!", severity: "success" },
                    }); 
        
            // Navigate based on user role
            setTimeout(() => {
                if (data.role === "ROLE_ADMIN") {
                    reqData.navigate("/admin/restaurants"); // Fixed typo in route
                } else {
                    reqData.navigate("/");
                }
            }, 2000); // 2-second delay for notification visibility
        }else{
            dispatch({type:LOGIN_FAILURE, 
                payload: { message: message || "Login failed. Please try again." },
            })

            dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: message || "Login failed. Please try again!", severity: "error" },
            });
            console.log("Login failed with message:", message);
        }

    } catch (error) {
                let errorMessage = "Login failed. Please try again!";
        if (error.response && error.response.data) {
            const { message, status } = error.response.data;
            errorMessage = message || errorMessage;

            // Handle specific error cases
             if (status === 400) {
                errorMessage = message || "Invalid input data. Please check your details.";
            }
        } else if (error.request) {
            errorMessage = "No response from server. Please check your network connection.";
        } else {
            errorMessage = error.message || errorMessage;
        }

        dispatch({type:LOGIN_FAILURE, 
                payload: { message: errorMessage },
        });

        // Trigger error notification
        dispatch({
            type: SHOW_NOTIFICATION,
            payload: { message: errorMessage, severity: "error" },
        });
        console.error("Login error:", error);
    }
}

export const getUser=()=>async(dispatch)=>{
    dispatch({type:GET_USER_REQUEST})

    try {
        //here we created api instance, when we are using api instance we don't need to provide API_URL
        const{data}=await api.get(`/user`,{});

        //we don't receive any jwt here
        dispatch({type:GET_USER_SUCCESS, payload:data.data})
        console.log("user profile",data);

    } catch (error) {
        dispatch({type:GET_USER_FAILURE, payload:error})
            // if token expired
    if (error.response?.status === 401 && error.response.data?.error === "Token expired") {
        // show notification
        dispatch(showNotification("Session expired. Please log in again.", "warning"));
  
        // redirect (Note: you can't use navigate directly here outside of component)
        window.location.href = "/account/login"; // or pass navigate from App.jsx if needed
      }
  
        console.log("error",error);
    }
}

export const addToFavouriter=({restaurentId})=>async(dispatch)=>{
    dispatch({type:ADD_TO_FAVOURITE_REQUEST})
    try {
        //pass the url of backend api in data and body is mandatory and we can pass empty body{} also/
        const{data}=await api.put(`/restaurants/${restaurentId}/add-favourites`,{});

        dispatch({type:ADD_TO_FAVOURITE_SUCCESS, payload:data.data})
        console.log("added to favourite",data);

    } catch (error) {
        dispatch({type:ADD_TO_FAVOURITE_FAILURE, payload:error})
        console.log("error",error);
    }
}

export const logout=()=>async(dispatch)=>{
    try {
        await api.post('/logout');
        dispatch({type:LOGOUT});
        toast.success('Logged out successfully');
        console.log('Logout successful');

    } catch (error) {
        console.log("error",error);
        toast.error(error.response?.data?.error || 'Failed to log out');

        
    }
}