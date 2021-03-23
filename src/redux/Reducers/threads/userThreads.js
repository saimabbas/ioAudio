import * as threadAction from "../../actions/threadsAction/threadActionTypes";

const initialstate = {
  loading: false,
  threads: [],

  errors: [],
  resetPasswordEmail: "",
  modal: false,
};

export default function (state = initialstate, action) {
  switch (action.type) {
    case threadAction.ADD_THREAD:
      return { ...state, loading: false, threads: action.payload };
    case threadAction.UPDATE_THREAD:
      return { ...state, loading: false, threads: action.payload };
    case threadAction.DELETE_THREAD:
      return initialstate;
    case threadAction.THREAD_LOADING:
      return { ...state, loading: action.payload };
    case threadAction.ADD_ERR: {
      return { ...state, errors: action.payload };
    }
    case threadAction.SET_MODAL:
      return { ...state, modal: action.payload };
    case threadAction.ADD_RESETEMAIL:
      return { ...state, resetPasswordEmail: action.payload };
    default:
      return state;
  }
}
