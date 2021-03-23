import * as actions from "./threadActionTypes";
const AddThread = (payload) => {
  return {
    type: actions.ADD_THREAD,
    payload,
  };
};
const UpdateThread = (payload) => ({
  type: actions.UPDATE_THREAD,
  payload,
});
const DeleteThread = () => ({
  type: actions.DELETE_THREAD,
});
const Loading = (payload) => ({
  type: actions.THREAD_LOADING,
  payload,
});
const AddErr = (payload) => ({
  type: actions.ADD_ERR,
  payload,
});
const SetModal = (payload) => ({
  type: actions.SET_MODAL,
  payload,
});
const AddResetEmail = (payload) => ({
  type: actions.ADD_RESETEMAIL,
  payload,
});

export {
  AddThread,
  UpdateThread,
  DeleteThread,
  Loading,
  AddErr,
  SetModal,
  AddResetEmail,
};
