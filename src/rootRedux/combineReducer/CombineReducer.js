import { combineReducers } from "redux";
import userReducer from "../../redux/Reducers/userReducer/userReducer";
import userThreads from "../../redux/Reducers/threads/userThreads";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const Reducers = combineReducers({
  userReducer,
  userThreads,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userThreads"],
};

export default persistReducer(persistConfig, Reducers);
