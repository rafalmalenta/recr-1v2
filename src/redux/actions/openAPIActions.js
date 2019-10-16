
export  function setCountryState(value){
    return{
        type: "setCountryState",
        payload: value
    }
}
export function setParameterState(value){
    return{
        type: "setParameterState",
        payload: value
    }
}
export function setDate(type,value){
    return{
        type: `setDate${type}`,
        payload: value
    }
}
export function getURL(){
    return{
        type: `getURL`,
        payload: ""
    }
}


