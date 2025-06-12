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

const initialState = {
  events: [],
  restaurantEvents: [],
  event: null,
  isLoading: false,
  success: null,
  error: null,
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_EVENTS_REQUEST:
    case GET_ALL_EVENTS_REQUEST:
    case GET_RESTAURANTS_EVENTS_REQUEST:
    case DELETE_EVENTS_REQUEST:
    case UPDATE_EVENTS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
        success: null,
      };

    case CREATE_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: [...state.events, action.payload].filter(event => !event.deleted),
        restaurantEvents: [...state.restaurantEvents, action.payload].filter(event => !event.deleted),
        success: "Event created successfully",
      };

    case GET_ALL_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: action.payload.filter(event => !event.deleted),
        success: "Events fetched successfully",
      };

    case GET_RESTAURANTS_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        restaurantEvents: action.payload.filter(event => !event.deleted),
        success: "Restaurant events fetched successfully",
      };

    case DELETE_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: state.events.filter(event => event.id !== action.payload),
        restaurantEvents: state.restaurantEvents.filter(event => event.id !== action.payload),
        success: "Event deleted successfully",
      };

    case UPDATE_EVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: state.events
          .map(event => (event.id === action.payload.id ? action.payload : event))
          .filter(event => !event.deleted),
        restaurantEvents: state.restaurantEvents
          .map(event => (event.id === action.payload.id ? action.payload : event))
          .filter(event => !event.deleted),
        success: "Event updated successfully",
      };

    case CREATE_EVENTS_FAILURE:
    case GET_ALL_EVENTS_FAILURE:
    case GET_RESTAURANTS_EVENTS_FAILURE:
    case DELETE_EVENTS_FAILURE:
    case UPDATE_EVENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};