
const initialEndPoint = {
  base :"https://api.openaq.org/v1/measurements?",
  order_by : "order_by=value&",
  sort_order : "sort=desc&",
  country: "country=PL&",
  parameter: "parameter=co&",
  date_from: "",
  date_to: "",
};
  
export default function(state = initialEndPoint, action) {
  switch (action.type) {
    
      default:
        return {...state};
    }
  }

  //https://api.openaq.org/v1/measurements?order_by=value&sort=desc&country=PL&parameter=co2&