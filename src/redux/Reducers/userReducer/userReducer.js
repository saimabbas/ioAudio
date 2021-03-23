
import * as userAction from "../../actions/userActions/userActionTypes"

const initialstate = {
  loading: false,
  user: {
    _id: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  },
  errors: [],
  resetPasswordEmail: "",
  modal: false
}

export default function (state = initialstate, action) {
  switch (action.type) {
    case userAction.ADD_USER:
      return { ...state, loading: false, user: action.payload }
    case userAction.UPDATE_USER:
      return { ...state, loading: false, user: action.payload }
    case userAction.DELETE_USER:
      return initialstate;
    case userAction.USER_LOADING:
      return { ...state, loading: action.payload }
    case userAction.ADD_ERR:
      {
        return { ...state, errors: action.payload }
      }
    case userAction.SET_MODAL:
      return { ...state, modal: action.payload }
    case userAction.ADD_RESETEMAIL:
      return { ...state, resetPasswordEmail: action.payload }
    default:
      return state
  }
}
