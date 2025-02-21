import { CREATE_EVENTS_FAILURE, CREATE_EVENTS_SUCCESS, DELETE_EVENTS_SUCCESS, GET_ALL_EVENTS_SUCCESS, GET_RESTAURENTS_EVENTS_SUCCESS } from "./ActionTypes";

const initialState={
    events:[],
    isLoading:false,
    success:null,
    error:null,
    event:null,
    restaurentEvents:[]
}

export const eventReducer=(state=initialState,action)=>{
    switch(action.type){
                case CREATE_EVENTS_SUCCESS:
                    return{
                        ...state,
                        isLoading:false,
                        // when we want to return any particular restautent event/ any event
                        events:[...state.events,action.payload],
                        restaurentEvents:[...state.restaurentEvents,action.payload],
                    };

                    case GET_ALL_EVENTS_SUCCESS:
                        return{
                            ...state,
                            isLoading:false,
                            //when we want to return all events array directly use action.payload
                            events:action.payload
                        };

                        case GET_RESTAURENTS_EVENTS_SUCCESS:
                            return{
                                ...state,
                                isLoading:false,
                                restaurentEvents:action.payload,
                            };
                        case DELETE_EVENTS_SUCCESS:
                            return{
                                ...state,
                                isLoading:false,
                                events:state.events.filter((item)=>item.id!==action.payload),
                                restaurentEvents:state.restaurentEvents.filter((item)=>item.id!==action.payload)
                            };

                        case CREATE_EVENTS_FAILURE:
                            return{...state, isLoading:false, error:action.payload};    
                
                            default:
                            return state;

    }
}