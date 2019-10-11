import { combineReducers } from "redux";
import countries from "./countries";
import pollutedCities from "./pollutedCities";

export default combineReducers({ countries, pollutedCities });
