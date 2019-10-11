
export default function filterCountries(namePartial){
    return{
        type: "filter",
        payload: `${namePartial}`
    }
}