import React from "react";


export default class DatePicker extends React.Component{
    constructor(){
        super()
    }
    render(){
        let period = "date_" + this.props.period;
        console.log(period)
        return(
            <section class={period}>Pick period of time
                <label >
                    <div>
                    {period}   
                    </div>               
                <input type="date" name={period} id={period} required/>
                <input type="time" name="time_from" id="time_from" required/>
                </label>
           
            </section>
        );
    }
}