import { async } from "q";

const initial ={
  loading:false,
  loaded:false,
  //error:"",
  citiesArray:[],
};
  
export default function(state = initial, action) {
  switch (action.type) {
    case "addCity":{
      let newArray=[]
      let citiesArray =  state.citiesArray
      newArray = [ ...citiesArray, action.payload]     
      return { ...state, citiesArray:newArray }
    }
    case "resetCity":{
        return {...state, citiesArray:[]}      
    }
    case "loading":{
      return {...state, loading:true}      
    }
    case "loaded":{
      return {...state, loading:false, loaded:true}      
    }
    case "error":{
      return {...state, citiesArray:false}      
    }
    default:
      return state;
  }
}