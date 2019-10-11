import React from "react";


export default class AutocompleteInput extends React.Component{
    constructor(){
        super()
    }
    render(){
        return(
            <label >
                Select country <br />
                <input id="countries" name="countries" type="text" />
                <div class="matchingCountries">
                    <div>1</div>
                    <div>1</div>
                    <div>1</div>
                </div>
            </label>
        );
    }
}