import  { getLabelForCountry }  from "../../assets/functions"
getLabelForCountry("poland");

const initialEndPoint = {
  base :"https://api.openaq.org/v1/measurements?limit=110&",
  order_by : "order_by=value&",
  sort_order : "sort=desc&",
  country: "",
  parameter: "",
  date_from: "",
  date_to: "",
  fullURL:""
};
  
export default function(state = initialEndPoint, action) {
  switch (action.type){
    case "setCountryState":{                   
        return { ...state, country:`country=${getLabelForCountry(action.payload)}&`}
    };
    case "setParameterState":{            
        return { ...state, parameter:`parameter=${action.payload}&`}
    };
    case "setDatefrom":{            
      return { ...state, date_from:`date_from=${action.payload}&`}
    };
    case "setDateto":{            
      return { ...state, date_to:`date_to=${action.payload}&`}
    };
    case "getURL":{
      return {...state, fullURL: `${state.base}${state.order_by}${state.sort_order}${state.country}${state.parameter}${state.date_from}${state.date_to}`}
    }

    default:
      return {...state};
  }
}