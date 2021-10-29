import * as React from "react"

import "../../styles/global.css"
import "../../styles/pages/landing.css"

const GuideItem = () => {
    return (
        <div className="guide-item">
            <div className="guide-item-header">
                <h4>Some items of interest</h4>
            </div>
            <ul className="guide-item-list">
                <li className="guide-item-list-item">Link to resource</li>
                <li className="guide-item-list-item">Link to resource</li>
                <li className="guide-item-list-item">Link to resource</li>
            </ul>
        </div>
    )
}

export default GuideItem