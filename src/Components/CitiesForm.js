import React from "react";
import AutocompleteInput from "./AutocompleteInput";
import PollutionRadios from "./PollutionRadios";
import DatePicker from "./Datepicker";
import { connect } from "react-redux";
import axios from "axios"
import { getURL } from "../redux/actions/openAPIActions";
import { arrayContainValue } from "../assets/functions"
import { async } from "q";

@connect((store)=>{
    return{        
        openAPIEndpoint: store.openAPIEndpoint
    }
})
export default class CitiesForm extends React.Component{
    constructor(){
        super()          
    }
    async fetchCities(URL,arrayToReturn){
        console.log(URL)
        try {let res = await axios.get(URL)            
                if(res.status == 200){                   
                     res.data.results.some(city=>{
                        if(!arrayContainValue(arrayToReturn,city.city) && (arrayToReturn.length < 10))
                            arrayToReturn.push(city.city) 
                            //console.log(city.city)  
                     })
                }
                else throw new Error("failed to load resource")
            return await arrayToReturn;          
        }
        catch(e){return await false}
        finally{}   
    }

    async fetchData(event){                
        event.preventDefault();  
        let cityarray = []; 
        let xax=[];
        let page = 1;         
        if(this.verifyForm()){
            await this.props.dispatch(getURL());
            do{
                cityarray = await this.fetchCities(`${this.props.openAPIEndpoint.fullURL}page=${page}`, cityarray);
                page++;                
            }
            while(cityarray.length < 10 && await this.fetchCities(`${this.props.openAPIEndpoint.fullURL}page=${page}`, cityarray));

            
           
        }
    }
    verifyForm(){
        let message=""; 
        let errors =[];     
        if(this.verify("country") != "" && (this.verify("country") !== true) ){
            errors.push("c")      
            message = "<div>"+ this.verify("country") +"<div />"
        }
        if(this.verify("parameter") != "" && (this.verify("parameter") !== true) ){          
            errors.push("c")      
            message = message +"<div>"+ this.verify("parameter") +"<div />"
        }

        document.querySelector(".errors").innerHTML = message;        
        if (errors.length == 0)
            return true
        else return false
    }
    verify(value){       
        if(this.props.openAPIEndpoint[value].split('=')[1]&&this.props.openAPIEndpoint[value].split('=')[1]!=="&"){               
            return true
        }
        else {         
            return `please pick ${value}`        
        }
    }   
   
    render(){  
        //console.log(this.props.openAPIEndpoint) 
        return(            
            <form onSubmit={()=>this.fetchData(event)} autoComplete="off">
                <section class="errors" style={{color:"red"}}></section>
                <AutocompleteInput />
                <PollutionRadios />
                <DatePicker period={"from"}/>
                <DatePicker  period={"to"}/>
                <input type="submit" value="Fetch Cities" />
            </form>
           
        );
    }
}