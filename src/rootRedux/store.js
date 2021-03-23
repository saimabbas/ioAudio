import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import Reducers from "./combineReducer/CombineReducer";
import { persistStore } from "redux-persist";
import logger from "redux-logger";
let store = createStore(Reducers, compose(applyMiddleware(thunk, logger)));
let persistor = persistStore(store);
export { store, persistor };
