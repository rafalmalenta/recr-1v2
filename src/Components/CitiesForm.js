import React from "react";
import AutocompleteInput from "./AutocompleteInput";
import PollutionRadios from "./PollutionRadios";
import DatePicker from "./Datepicker"


export default class CitiesForm extends React.Component{
    constructor(){
        super()
        this.state = {
            countries: ["Poland","France","Germany","Spain"],
            matchingCountries: [],
        }
    }
    matchCountries(partialName){
        let matchingCountries = [];
        let array =  [ ...this.state.countries ] 
        console.log(partialName)
        array.forEach(country=>{
            let countryLowercase = country.toLowerCase();
            let partialNameLowercase = partialName.toLowerCase();
            if( countryLowercase.includes(partialNameLowercase)){
                
                matchingCountries.push(country)
            }
        });
        this.setState({matchingCountries : matchingCountries})
    }
    fetchCities(that, event){        
        event.preventDefault()
        console.log(event)
    }
    componentDidMount(){
        this.matchCountries("");
    }
    render(){        
        return(
            
                <form onSubmit={this.fetchCities.bind(this, event)} autoComplete="off">
                    <AutocompleteInput autocompleteList={this.state.matchingCountries} matchCountries={this.matchCountries.bind(this)}/>
                    <PollutionRadios />
                    <DatePicker />
                    <input type="submit" value="Fetch Cities" />
                </form>
           
        );
    }
}