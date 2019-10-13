export function getLabelForCountry(country){
    let countryLowerCase = country.toLowerCase()
    switch (countryLowerCase){
        case "poland":{                     
            return "PL"
        };
        case "germany":{            
            return "DE"
        };
        case "spain":{            
            return "ES"
        };
        case "france":{            
            return "FR"
        };
        default:
            return ""
    } 
};
export default function nameIsEqualPattern(name,pattern){
    let nameLowercase = name.toLowerCase();
    let patternLowercase = pattern.toLowerCase();   
    if(nameLowercase==patternLowercase)
        return true
    else
        return false
}
export function arrayContainValue(array,name){
    var bool = false;
    array.forEach(country=>{        
        if(nameIsEqualPattern(name,country)){                
            bool = true
        }
    });       
    return bool       
}


