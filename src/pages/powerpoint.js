import * as React from "react"
import PageLayout from "../components/layout"

import ContentSection from "../components/content/section.js"

import "../styles/pages/resources.css"

const PowerpointPage = () => {
    return (
      <PageLayout>
            <div className="resource-wrapper">
                <div className="resource-header">
                    <h1 className="fw-light">Create CJML diagrams in PowerPoint</h1>
                </div>
                <div className="resource-intro">
                    <p className="lead text-muted">The resources on this page contain everything you need to get started with creating CJML diagrams in PowerPoint.</p>
                </div>
                <ul className="section-list">
                    <ContentSection title="Diagram Templates" keyword="powerpoint"/>
                </ul>
            </div>
      </PageLayout>        
    )
}

export default PowerpointPage