import * as React from "react"
import PageLayout from "../components/layout"

import ContentSection from "../components/content/section.js"

import "../styles/pages/resources.css"

const ResourcePage = () => {
    return (
      <PageLayout>
            <div className="resource-wrapper">
                <div className="resource-header">
                    <h1>Resources</h1>
                </div>
                <div className="resource-intro">
                    <p>Below you can find some resources that can help you get started with CJML.</p>
                </div>
                <ul className="section-list">
                    <ContentSection />
                    <ContentSection />
                </ul>
            </div>
      </PageLayout>        
    )
}

export default ResourcePage