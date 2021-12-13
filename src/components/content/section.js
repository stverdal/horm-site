import * as React from "react"

import ContentItem from "./item.js"

import "../../styles/global.css"
import "../../styles/content/section.css"

const ContentSection = () => {
    return (
        <div className="section-wrapper">
            <div className="section-header">
                <h2 className="fw-light">Resource section</h2>
            </div>
            <ul className="section-content">
                <ContentItem />
                <ContentItem />
                <ContentItem />
                <ContentItem />
            </ul>
        </div>
    )
}

export default ContentSection