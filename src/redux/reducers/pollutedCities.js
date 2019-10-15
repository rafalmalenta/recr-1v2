
const initial ={
  loading:false,
  loaded:false,
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
    default:
      return state;
  }
}