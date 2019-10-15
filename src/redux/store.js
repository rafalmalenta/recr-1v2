import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger'
import rootReducer from "./reducers";

const logger = createLogger({
    // ...options
  });
  const middleware = applyMiddleware(logger)

export default createStore(rootReducer,middleware);
