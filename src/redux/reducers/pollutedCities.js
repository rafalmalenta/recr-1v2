
const initial ={
  fetching:"ds",
  fetched:"as",
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
    default:
      return state;
  }
}