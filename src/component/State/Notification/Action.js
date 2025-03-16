import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "./ActionType";

// Action creators
export const showNotification = (message, severity) => ({
    type: SHOW_NOTIFICATION,
    payload: { message, severity },
  });

  export const hideNotification = () => ({
    type: HIDE_NOTIFICATION,
  });
