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
export function loading(){
    return{
        type: "loading",
        payload: ""
    }
}
export function loaded(){
    return{
        type: "loaded",
        payload: ""
    }
}