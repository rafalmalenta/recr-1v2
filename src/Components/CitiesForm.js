import React from "react";
import AutocompleteInput from "./AutocompleteInput";
import PollutionRadios from "./PollutionRadios";
import DatePicker from "./Datepicker"


export default class CitiesForm extends React.Component{
    constructor(){
        super()          
    }
    
    fetchCities(that, event){        
        event.preventDefault()
        console.log(event)
    }
   
    render(){   
        return(            
            <form onSubmit={this.fetchCities.bind(this, event)} autoComplete="off">
                <AutocompleteInput />
                <PollutionRadios />
                <DatePicker period={"from"}/>
                <DatePicker  period={"to"}/>
                <input type="submit" value="Fetch Cities" />
            </form>
           
        );
    }
}