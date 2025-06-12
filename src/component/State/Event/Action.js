import { api } from "../../config/api";
import { SHOW_NOTIFICATION } from "../Notification/ActionType";
import {
  CREATE_EVENTS_REQUEST,
  CREATE_EVENTS_SUCCESS,
  CREATE_EVENTS_FAILURE,
  GET_ALL_EVENTS_REQUEST,
  GET_ALL_EVENTS_SUCCESS,
  GET_ALL_EVENTS_FAILURE,
  GET_RESTAURANTS_EVENTS_REQUEST,
  GET_RESTAURANTS_EVENTS_SUCCESS,
  GET_RESTAURANTS_EVENTS_FAILURE,
  DELETE_EVENTS_REQUEST,
  DELETE_EVENTS_SUCCESS,
  DELETE_EVENTS_FAILURE,
  UPDATE_EVENTS_REQUEST,
  UPDATE_EVENTS_SUCCESS,
  UPDATE_EVENTS_FAILURE,
} from "./ActionTypes";

export const createEvent = ({ datas}) => {
  return async (dispatch) => {
    dispatch({ type: CREATE_EVENTS_REQUEST });

    try {
      const {data} = await api.post("/events", datas);

      if(response.data.success){
      dispatch({ type: CREATE_EVENTS_SUCCESS, payload: data.data });

      dispatch({type:SHOW_NOTIFICATION,
        payload:{message:data.message, severity:"succcess"}
      })
      getAllEvents();
      }
      else{
          dispatch({
        type: CREATE_EVENTS_FAILURE,
        payload: data.message,
      });
                  dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });

      }
    } catch (error) {
         let errorMessage = "Failed to create menu item. Please try again!";
        if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
        }

      dispatch({
        type: CREATE_EVENTS_FAILURE,
        payload: error.response?.data?.message || "Failed to create event",
      });
    }
  };
};

export const getAllEvents = () => {
  return async (dispatch) => {
    dispatch({ type: GET_ALL_EVENTS_REQUEST });

    try {
      const response = await api.get("/events");
      dispatch({ type: GET_ALL_EVENTS_SUCCESS, payload: response.data.data });
    } catch (error) {
      dispatch({
        type: GET_ALL_EVENTS_FAILURE,
        payload: error.response?.data?.message || "Failed to fetch events",
      });
    }
  };
};

export const getRestaurantsEvents = ({ restaurantId }) => {
  return async (dispatch) => {
    dispatch({ type: GET_RESTAURANTS_EVENTS_REQUEST });

    try {
      const response = await api.get(`/events/restaurant/${restaurantId}`);
      dispatch({
        type: GET_RESTAURANTS_EVENTS_SUCCESS,
        payload: response.data.data,
      });
    } catch (error) {
      dispatch({
        type: GET_RESTAURANTS_EVENTS_FAILURE,
        payload: error.response?.data?.message || "Failed to fetch restaurant events",
      });
    }
  };
};

export const deleteEvent = ({ eventId}) => {
  return async (dispatch) => {
    dispatch({ type: DELETE_EVENTS_REQUEST });

    try {
      const {data} = await api.delete(`/events/${eventId}`);
      dispatch({
        type: DELETE_EVENTS_SUCCESS,
        payload: eventId, // Pass eventId to remove from state
      });
       dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
    } catch (error) {
      dispatch({
        type: DELETE_EVENTS_FAILURE,
        payload: error.response?.data?.message || "Failed to delete event",
      });
    }
  };
};

export const updateEvent = ({ eventId, data}) => {
  return async (dispatch) => {
    dispatch({ type: UPDATE_EVENTS_REQUEST });

    try {
      const {data}= await api.put(`/events/${eventId}`, data);
      if(data.success){
         dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "success" }
            });
             dispatch({ type: UPDATE_EVENTS_SUCCESS, payload: data.data });
      }
      else{
         dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });

        dispatch({
        type: UPDATE_EVENTS_FAILURE,
        payload: error.response?.data?.message || "Failed to update event",
      });
      }

    } catch (error) {
       dispatch({
                type: SHOW_NOTIFICATION,
                payload: { message: data.message, severity: "error" }
            });
      dispatch({
        type: UPDATE_EVENTS_FAILURE,
        payload: error.response?.data?.message || "Failed to update event",
      });
    }
  };
};