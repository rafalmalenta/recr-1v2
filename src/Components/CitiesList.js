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
        let height = e.target.nextSibling.style.maxHeight;        
        if(height == "1222px"){
            e.target.nextSibling.style.maxHeight="0px";
        }       
        else
        e.target.nextSibling.style.maxHeight= "1222px"        
        e.target.nextSibling.style.backgroundColor="red"
       
    }
    render(){        
        let display
        //console.log("sa",this.props.cities.citiesArray)
        if(this.props.cities.loading == true){
            display=<div>Loading</div>
        }
        else if(this.props.cities.loaded == true){
            if(this.props.cities.citiesArray){
            display=this.props.cities.citiesArray.map((city,index)=>

                <section class="accordion" key={index}>
                <h1 onClick={()=>this.toggleVisibility(event)} >{city.header}</h1>
                <div >
                    {city.describtion}
                </div>
                </section>
            )
            }
            else {
                display=<div>Something wron happened</div>
            }
        }       

        
        return(
            <div>
                {display}
            </div>
        );
    }
}