import React from "react";
import { connect } from "react-redux";


@connect((store)=>{
    return{   
        cities: store.pollutedCities,
    }
})
export default class CitiesList extends React.Component{
    constructor(){
        super()
    }
    toggleVisibility(e){
        let className = e.target.nextSibling.classList[0];
        console.log(className)
        if(className=="hidden")
        e.target.nextSibling.classList="show";
        else
        e.target.nextSibling.classList="hidden";
        // e.target.nextSibling
         console.log(e.target)
    }
    render(){
        console.log(this.props.cities)
        let display
        if(this.props.cities.loading == true){
            display=<div>Loading</div>
        }
        else if(this.props.cities.loaded == true){
            display=this.props.cities.citiesArray.map((city,index)=>

                <section class="accordion" key={index}>
                <h2 onClick={()=>this.toggleVisibility(event)} >{city.header}</h2>
                <div class="hidden">
                    {city.describtion}
                </div>
                </section>
            )
        }
        return(
            <div>
                {display}
            </div>
        );
    }
}