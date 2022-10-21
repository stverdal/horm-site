import React, {useEffect, useState} from "react"

import IconWrapper from "./iconwrapper"
import iconInfo from "./iconinfo"

import "../../styles/content/iconsection.css"

function IconSection({section, subsection = "none"}){

    const [icons, setIcons] = useState([])

    useEffect(() => {
        switch (subsection) {
            case "none":
                setIcons(Object.keys(iconInfo[section]))
                break;
            default:
                setIcons(Object.keys(iconInfo[section]).filter(function(key) { 
                    console.log("inside",iconInfo[section][key]["subsection"]);
                    return iconInfo[section][key]["subsection"] == subsection
                }))
                //setIcons(Object.keys(iconInfo[section]).filter(key => iconInfo[section][key]["subsection"] = subsection))
        
        }

    }, []);

    
    return (
        <div className="icon-section">
            {icons.map(key => <IconWrapper section={section} item={iconInfo[section][key]}/>)}
        </div>
    )
}

export default IconSection