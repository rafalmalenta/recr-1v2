import { combineReducers } from "redux";
import openAPIEndpoint from "./openAPIEndpoint";
import pollutedCities from "./pollutedCities";

export default combineReducers({ openAPIEndpoint, pollutedCities });
