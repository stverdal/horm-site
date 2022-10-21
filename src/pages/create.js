import * as React from "react"
import PageLayout from "../components/layout"


import "../styles/pages/resources.css"
import CategorySection from "../components/content/category"

const CreatePage = () => {
  return (
    <PageLayout>
          <div className="resource-wrapper">
              <div className="resource-header">
                  <h2 className="fw-light">Create diagrams using one</h2>
              </div>
              <div className="resource-intro">
                  <p className="lead text-muted">On this page you can find three different tools for creating diagrams in various formats. If you are not familiar with CJML you might want to visit the LEARN resource page first, to get a general introduction to the main concepts and diagram types.</p>
              </div>
              <ul className="section-list">
                  <CategorySection type="create" category="powerpoint"/>
                  <CategorySection type="create" category="onlinediagrams"/>
                  <CategorySection type="create" category="editor"/>
              </ul>
          </div>
    </PageLayout>        
  )
}

export default CreatePage