import React from "react";
import {connect} from "react-redux";
import { setParameterState } from "../redux/actions/openAPIActions";

@connect((store)=>{
    return{
        parameter: store.openAPIEndpoint.parameter
    }
})
export default class PollutionRadios extends React.Component{
    constructor(){
        super()
    }
    componentDidMount(){
        let radios = document.querySelectorAll("input[name=pollution]");
        radios.forEach((radio)=>{
            radio.addEventListener("click",(event)=>{
                this.props.dispatch(setParameterState(event.target.value))
            })
        })
    }
    componentWillUnmount(){
        let radios = document.querySelectorAll("input[name=pollution]");
        radios.forEach((radio)=>{
            radio.removeEventListener("click");
        })
    }
    render(){
        return(
            <section class="parameter">
                <div >Pick pollution type</div>
                <div class="radioWrapper">
                    <div class="row">
                        <input id="o3" type="radio" name="pollution" value="o3" /><label for="o3">o3</label>
                        <input id="co" type="radio" name="pollution" value="co" /> <label for="co">co</label>
                        <input id="no2" type="radio" name="pollution" value="no2" /><label for="no2">no2</label> 
                    </div>
                    <div class="row">
                        <input id="bc" type="radio" name="pollution" value="bc" /> <label for="bc">bc</label>
                        <input id="pm10" type="radio" name="pollution" value="pm10" /> <label for="pm10">pm10</label>
                        <input id="pm25" type="radio" name="pollution" value="pm25" /><label for="pm25">pm25</label>
                    </div>
                    
                </div>
            </section>
        );
    }
}