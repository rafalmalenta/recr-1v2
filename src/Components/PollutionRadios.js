import React from "react";


export default class PollutionRadios extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <input id="o3" type="radio" name="pollution" value="o3" /><label for="o3">o3</label>
                <input id="co2" type="radio" name="pollution" value="co" /> <label for="co2">co2</label>
                <input id="no2" type="radio" name="pollution" value="no2" /><label for="no2">no2</label>
                <input id="bc" type="radio" name="pollution" value="bc" /> <label for="bc">bc</label>
                <input id="pm10" type="radio" name="pollution" value="pm10" /> <label for="pm10">pm10</label>
                <input id="pm25" type="radio" name="pollution" value="pm25" /><label for="pm25">pm25</label>
            </div>
        );
    }
}