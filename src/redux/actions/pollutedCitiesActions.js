export function addCity(value){
    return{
        type: "addCity",
        payload: value
    }
}
export function resetCity(){
    return{
        type: "resetCity",
        payload: ""
    }
}