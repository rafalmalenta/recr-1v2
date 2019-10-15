import React from "react";
import AutocompleteInput from "./AutocompleteInput";
import PollutionRadios from "./PollutionRadios";
import DatePicker from "./Datepicker";
import { connect } from "react-redux";
import axios from "axios"
import { getURL } from "../redux/actions/openAPIActions";
import { arrayContainValue, copyFromArrayIfNotDuplicated } from "../assets/functions";
import { addCity,resetCity,loaded,loading } from "../redux/actions/pollutedCitiesActions";


@connect((store)=>{
    return{        
        openAPIEndpoint: store.openAPIEndpoint,
        cities: store.pollutedCities,
    }
})
export default class CitiesForm extends React.Component{
    constructor(){
        super()          
    }
    async fetchCities(URL,arrayToReturn){      
        try {let res = await axios.get(URL)            
                if(res.status == 200 && res.data.meta.found !== 0){ 
                    arrayToReturn = copyFromArrayIfNotDuplicated(res.data.results,arrayToReturn)                 
                }
                else throw "failed to load resource"
            return await arrayToReturn;          
        }
        catch(e){return await false}
        finally{}   
    }
    async fetchDescribtionFromWikipedia(city){   
        await this.props.dispatch(resetCity());         
        let response = await axios({
            type: "GET",   
            params: { 
                origin: "*",
            },
            url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&explaintext&titles="+city,
            success: {
            },
            error: "",        
        })
        var singleResponse = response.data.query.pages;
        var pageID = Object.keys(singleResponse)[0];
        var describtion = singleResponse[pageID]["extract"];
        if(describtion){
            describtion=describtion
        }
        else
            describtion="no records found on wikipedia"
        let payload = {
            header:city,
            describtion:describtion,
        }       
        await this.props.dispatch(addCity(payload));      
    }

    async fetchData(event){                
        event.preventDefault();  
        this.props.dispatch(resetCity());
        this.props.dispatch(loading());

        let temporaryArray = [];
        console.log(temporaryArray)
        let citiesArray; 
        let page = 1;      
        console.log()   
        if(this.verifyForm()&&this.props.cities.loading==false){
            await this.props.dispatch(getURL());
            //loop incase 1request didnt contain 10 unique citis
            do{
                citiesArray = await this.fetchCities(`${this.props.openAPIEndpoint.fullURL}page=${page}`, temporaryArray);
                page++;                              
            }            
            while(citiesArray.length < 10);            
            citiesArray.forEach((city)=>{
                this.fetchDescribtionFromWikipedia(city)
            })
            this.props.dispatch(loaded())           
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