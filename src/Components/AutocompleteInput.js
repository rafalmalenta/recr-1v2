import React from "react";
import  filterCountries  from "../redux/actions/countriesActions"

export default class AutocompleteInput extends React.Component{
    constructor(){
        super()             
    }
    showMatchingCountries(e){       
        this.props.matchCountries(e.target.value);
        //console.log("input")            
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
        //this.props.dispatch(filterCountries(value))     
        document.getElementById("autoComplete").value = value;
    }
    render(){
        //console.log(this.props.autocompleteList)
        let mapedCountries = this.props.autocompleteList.map((country,index) => {
            return <div key = {index} onClick={this.setInput.bind(this,country)} >{country}</div>
        });
       
        return(
            <section>
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
            </section>
        );
    }
}