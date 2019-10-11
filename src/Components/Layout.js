import React from "react";
import CitiesForm from "./CitiesForm";
import CitiesList from "./CitiesList";


export default class Layout extends React.Component{
    constructor(){
        super();
        this.state = {
            inputValue : localStorage.getItem("inputvalue"),
            loaded : false,
            matchingCountries : ""
        }
    }
    componentDidMount (){
        this.setState({loaded : true})
    }
    
    render(){
        let Content;
        if (this.state.loaded){
            Content = <div class="Page"><CitiesForm /> <CitiesList /></div>  
        }
        else{
            Content=<div>LOADING</div>
        }   
        return(           
            <div class = "Layout">                
                { Content }
                
            </div>
        );
    }
}