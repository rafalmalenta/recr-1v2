import React from "react";
import AutocompleteInput from "./AutocompleteInput";
import PollutionRadios from "./PollutionRadios"


export default class CitiesForm extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            
                <form>
                    <AutocompleteInput />
                    <PollutionRadios />
                </form>
           
        );
    }
}