
export const NOTIFY_SUCCESS = 'NOTIFY_SUCCESS';

export function notifySuccess(message) {
  return {
    type: NOTIFY_SUCCESS,
    payload: message,
  };
}
