import React from "react";
import {connect} from "react-redux"
import { setCountryState } from "../redux/actions/openAPIActions";
import {arrayContainValue} from "../assets/functions";

@connect((store)=>{
    return{
       form: store.openAPIEndpoint.country
    }
})
export default class AutocompleteInput extends React.Component{
    constructor(){
        super()             
        this.state = {
            countries: ["Poland","France","Germany","Spain"],
            matchingCountries: [],
            inputValue: localStorage.getItem("inputValue")||""
        }        
    }
    valuesCompareCaseInsesitive(value, country){       
        let countryLowercase = country.toLowerCase();
        let partialNameLowercase = value.toLowerCase();        
        if( countryLowercase.includes(partialNameLowercase)&& value){                         
            return true;
        }
        else  
        return false;
    }
    nameIsEqualPattern(name,pattern){
        let nameLowercase = name.toLowerCase();
        let patternLowercase = pattern.toLowerCase();   
        if(nameLowercase==patternLowercase)
            return true
        else
            return false
    }
    arrayContainValue(array,name){
        var bool = false;
        array.forEach(country=>{        
            if(this.nameIsEqualPattern(name,country)){                
                bool = true
            }
        });       
        return bool       
    }
    arrayContainNamePart(array,name){
        var bool = false;
        array.forEach(country=>{        
            if(this.valuesCompareCaseInsesitive(name, country)){                
                bool = true
            }
        });       
        return bool       
    }
    setMatchingCountries(partialName){
        let matchingCountries = [];
        let array =  [ ...this.state.countries ];           
        array.forEach(country=>{
            if(this.valuesCompareCaseInsesitive(partialName, country)){
                matchingCountries.push(country);
            }
        });
        this.setState({matchingCountries : matchingCountries})
    }
    showMatchingCountries(event){       
        this.setMatchingCountries(event.target.value);
    }
    setInput(value){            
        document.getElementById("autoComplete").value = value;
        localStorage.setItem("inputValue",value);
        this.setState({inputValue:value});
        this.props.dispatch(setCountryState(value));
    }    
    showAutocompleteList(){
        document.querySelector(".AutocompleteList").style.visibility= "visible";   
    } 
    hideAutocompleteList(){
        setTimeout(()=>{
            document.querySelector(".AutocompleteList").style.visibility= "hidden";           
        },150);        
        this.props.dispatch(setCountryState(document.getElementById("autoComplete").value));
       
    }
    componentDidMount(){        
        this.setMatchingCountries(this.state.inputValue);
        if(this.arrayContainValue([ ...this.state.countries ], document.getElementById("autoComplete").value))
            this.props.dispatch(setCountryState(this.state.inputValue));
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
                    defaultValue = {this.state.inputValue}
                />
                </label>    
                <div class="AutocompleteList">
                    { mapedCountries }
                </div>
            </section>
        );
    }
}