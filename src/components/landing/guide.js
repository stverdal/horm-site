import * as React from "react"

import "../../styles/global.css"
import "../../styles/pages/landing.css"

import GuideItem from "./guide-item"

const LandingGuide = () => {
    return (
        <div className="landing-guide">
            <ul className="landing-guide-items">
                <GuideItem />
                <GuideItem />
                <GuideItem />
            </ul>
        </div>
    )
}

export default LandingGuide