import React from "react";

export default class AutocompleteInput extends React.Component{
    constructor(){
        super()             
        this.state = {
            countries: ["Poland","France","Germany","Spain"],
            matchingCountries: [],
        }
        this.inputValue 
    }
    matchCountries(partialName){
        let matchingCountries = [];
        let array =  [ ...this.state.countries ]         
        array.forEach(country=>{
            let countryLowercase = country.toLowerCase();
            let partialNameLowercase = partialName.toLowerCase();
            if( countryLowercase.includes(partialNameLowercase)){                
                matchingCountries.push(country)
            }
        });
        this.setState({matchingCountries : matchingCountries})
    }
    showMatchingCountries(event){       
        this.matchCountries(event.target.value);
    }
    setInput(value){            
        document.getElementById("autoComplete").value = value;
        localStorage.setItem("inputValue",value)        
    }
    
    showAutocompleteList(){
        document.querySelector(".AutocompleteList").style.visibility= "visible";   
    } 
    hideAutocompleteList(){
        setTimeout(()=>{
            document.querySelector(".AutocompleteList").style.visibility= "hidden";           
        },150);
    }
    componentDidMount(){
        this.inputValue = localStorage.getItem("inputValue");
        this.matchCountries(this.inputValue);
    }    
    render(){        
        let mapedCountries = this.state.matchingCountries.map((country,index) => {
            return <div key = {index} onClick={this.setInput.bind(this,country)} >{country}</div>
        });        
        return(
            <section class="country">
                <label >
                <div>Select country </div>
                <input type="text" name="country" id="autoComplete"
                    onFocus = {this.showAutocompleteList.bind(this)} 
                    onBlur = {this.hideAutocompleteList.bind(this)} 
                    onInput = {this.showMatchingCountries.bind(this)}  
                    defaultValue = {this.inputValue}
                />
                </label>    
                <div class="AutocompleteList">
                    { mapedCountries }
                </div>
            </section>
        );
    }
}