import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from 'redux-logger';
import userReducer from "./reducers/user";

const store = createStore(
    combineReducers({
        user: userReducer
    }),
    process.env.NODE_ENV === 'production' ? undefined : applyMiddleware(logger)
);

export default store;