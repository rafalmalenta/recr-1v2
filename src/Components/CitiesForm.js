import React from "react";
import AutocompleteInput from "./AutocompleteInput";
import PollutionRadios from "./PollutionRadios";
import DatePicker from "./Datepicker";
import { connect } from "react-redux";
import axios from "axios"
import { getURL } from "../redux/actions/openAPIActions";
import { arrayContainValue, copyFromArrayIfNotDuplicated } from "../assets/functions";
import { addCity,resetCity,loaded,loading,dispatchError } from "../redux/actions/pollutedCitiesActions";
import { async } from "q";


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
            return arrayToReturn;          
        }
        catch(e){return false}
        finally{}   
    }    
    async fetchDescribtionFromWikipedia(city){               
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
            describtion = describtion
        }
        else
            describtion="no records found on wikipedia"
        let payload = {
            header:city,
            describtion:describtion,
        }       
        await this.props.dispatch(addCity(payload));      
    }
    async forEachFetch(array){
        await array.forEach(async(city,index)=>{                              
            await this.fetchDescribtionFromWikipedia(city)
            //workaround need improve this oneday            
            if(index >= 9){
                return await this.props.dispatch(loaded()) 
            }             
        })  
    }
    async fetchData(event){               
        event.preventDefault();          
        let temporaryArray = [];        
        let citiesArray; 
        let page = 1;      
         
        if((this.verifyForm()) && (this.props.cities.loading == false)){
            await this.props.dispatch(resetCity());            
            await this.props.dispatch(loading());            
            await this.props.dispatch(getURL());
            //loop incase 1request didnt contain 10 unique citis
            do{              
                citiesArray = await this.fetchCities(`${this.props.openAPIEndpoint.fullURL}page=${page}`, temporaryArray);
                page++;                              
            }            
            while(citiesArray.length < 10);            
            if(await this.fetchCities(`${this.props.openAPIEndpoint.fullURL}page=${page}`, temporaryArray)){ 
                await this.forEachFetch.call(this,citiesArray)
            } 
            else{                
                await this.props.dispatch(loaded()) 
                await this.props.dispatch(dispatchError());
            } 
        }          
    }
    verifyForm(){
        let message=""; 
        let errors =[];     
        if(!this.verify("country") ){
            errors.push("c")      
            message = "<div>please pick country <div />"
        }
        if(!this.verify("parameter") ){          
            errors.push("c")      
            message = message +"<div>please pick parameter <div />"
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
            return false       
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