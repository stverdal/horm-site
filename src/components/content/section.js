import * as React from "react"

import ContentItem from "./item.js"

import "../../styles/global.css"
import "../../styles/content/section.css"

import courseinfo from './courseinfo'

const ContentSection = ({title, keyword}) => {
    return (
        <div className="section-wrapper">
            <div className="section-header">
                <h2 className="fw-light">{title}</h2>
            </div>
            <ul className="section-content">
                {Object.keys(courseinfo[keyword]).map(key => 
                    <ContentItem title={courseinfo[keyword][key]["title"]} contentName={courseinfo[keyword][key]["content_name"]} image={courseinfo[keyword][key]["image"]}/>
                )}
            </ul>
        </div>
    )
}

export default ContentSection