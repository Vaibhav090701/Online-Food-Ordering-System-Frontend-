import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "./ActionType";

const initialState = {
    notification: {
        open: false,
        message: '',
        severity: 'success', // 'success' | 'error'
    }
};

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_NOTIFICATION:
            return {
                ...state,
                notification: {
                    open: true,
                    message: action.payload.message,
                    severity: action.payload.severity
                }
            };
        case HIDE_NOTIFICATION:
            return {
                ...state,
                notification: {
                    open: false,
                    message: '',
                    severity: 'success'
                }
            };
        default:
            return state;
    }
};

export default notificationReducer;
