import React from "react";
import {connect} from "react-redux";
//import { setParameterDate } from "../redux/actions/openAPIActions";

import { setDate } from "../redux/actions/openAPIActions";

@connect((store)=>{
    return{
        date: {
            dateFrom: store.openAPIEndpoint.dateFrom,
            dateTo: store.openAPIEndpoint.dateFrom
        },
    }
})
export default class DatePicker extends React.Component{
    constructor(){
        super()
    }
    setStore(event){
        //console.log(event.target.value);
        this.props.dispatch(setDate(this.props.period,event.target.value))
    }
    render(){
        let period = "date_" + this.props.period;
        //console.log("data",this.props.date)
        return(
            <section class={period}>Pick period of time
                <label >
                    <div>
                    {period}   
                    </div>               
                <input onChange={()=>this.setStore(event)} type="date" name={period} id={period} />
                
                </label>
           
            </section>
        );
    }
}