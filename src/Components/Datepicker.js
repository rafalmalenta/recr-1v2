import React from "react";


export default class DatePicker extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <section>Pick period of time
                <label >
                    <div>
                     date from    
                    </div>                   
                <input type="date" name="date_from" id="date_from" />
                <input type="time" name="time_from" id="time_from" />
                </label>
                <label >
                    <div>
                    date to
                    </div>
                <input type="date" name="date_to" id="date_to" />
                <input type="time" name="time_to" id="time_to" />
                </label>
            </section>
        );
    }
}