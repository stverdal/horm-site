import * as React from "react"
import PageLayout from "../components/layout"


import "../styles/pages/resources.css"
import CategorySection from "../components/content/category"

const ResourcePage = () => {
    return (
        <PageLayout>
              <div className="resource-wrapper">
                  <div className="resource-header">
                      <h1 className="fw-light">Learn</h1>
                  </div>
                  <div className="resource-intro">
                      <p className="lead text-muted">Use the resources below to learn more about  cybersecurity, CJML and HORM.</p>
                  </div>
                  <ul className="section-list">
                      <CategorySection type="learn" category="cjml"/>
                      <CategorySection type="learn" category="cybersecurity"/>
                      <CategorySection type="learn" category="game"/>
                  </ul>
              </div>
        </PageLayout>        
      )
  }

export default ResourcePage