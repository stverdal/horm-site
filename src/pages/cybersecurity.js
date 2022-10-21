import * as React from "react"
import PageLayout from "../components/layout"

import ContentSection from "../components/content/section.js"

import "../styles/pages/resources.css"

const CybersecurityPage = () => {
    return (
      <PageLayout>
            <div className="resource-wrapper">
                <div className="resource-header">
                    <h1 className="fw-light">Cybersecurity courses</h1>
                </div>
                <div className="resource-intro">
                    <p className="lead text-muted">Learn about Cybersecurity with the resources below.</p>
                </div>
                <ul className="section-list">
                    <ContentSection title="Cybersecurity courses" keyword="cybersecurity"/>
                </ul>
            </div>
      </PageLayout>        
    )
}

export default CybersecurityPage