
const AllowedCountries = ["Poland","France","Germany","Spain"];
  
export default function(state = [], action) {
  switch (action.type) {
    case "filter":{  
      state =[];
      AllowedCountries.forEach(country=>{
        let countryLowercase = country.toLowerCase();
        let payloadLowercase = action.payload.toLowerCase();
        if( countryLowercase.includes(payloadLowercase)){
          state.push(country)
        }
      })
    console.log(state)
    return state
    }         
      default:
        return [...state];
    }
  }