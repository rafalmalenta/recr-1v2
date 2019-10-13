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
        let height = e.target.nextSibling.style.maxHeight
        console.log(height)
        if(height == "1222px"){
            e.target.nextSibling.style.maxHeight="0px";
        }       
        else
        e.target.nextSibling.style.maxHeight= "1222px"
        //e.target.nextSibling.classList="hidden";
        e.target.nextSibling.style.backgroundColor="red"
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
                <h1 onClick={()=>this.toggleVisibility(event)} >{city.header}</h1>
                <div >
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