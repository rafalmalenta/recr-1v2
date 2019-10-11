import React from "react";
import { connect } from "react-redux";
import  filterCountries  from "../redux/actions/countriesActions"

@connect(store=>{
    return{
        countries: store.countries,  
    }
})
export default class AutocompleteInput extends React.Component{
    constructor(){
        super()             
    }
    showMatchingCountries(e){       
        this.props.dispatch(filterCountries(e.target.value)) ;            
    }
    showAutocompleteList(){
        document.querySelector(".AutocompleteList").style.visibility= "visible";   
    } 
    hideAutocompleteList(){
        setTimeout(()=>{
            document.querySelector(".AutocompleteList").style.visibility= "hidden";           
        },150)       
    } 
    setInput(value){  
        this.props.dispatch(filterCountries(value))     
        document.getElementById("autoComplete").value = value;
    }
    render(){
        
        let mapedCountries = this.props.countries.map((country,index) => {
            return <div key = {index} onClick={this.setInput.bind(this,country)} >{country}</div>
        });
       
        return(
            <div>
                <label >
                <div>Select country </div>
                <input type="text" name="country" id="autoComplete"
                    onFocus = {this.showAutocompleteList.bind(this)} 
                    onBlur = {this.hideAutocompleteList.bind(this)} 
                    onInput = {this.showMatchingCountries.bind(this)}  
                />
                </label>    
                <div class="AutocompleteList">
                    { mapedCountries }
                </div>
            </div>
        );
    }
}