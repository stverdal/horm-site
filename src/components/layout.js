import * as React from "react"
import Header from "./header"
import Footer from "./footer"

import "../styles/global.css"
import "../styles/layout/layout.css"
import "bootstrap/dist/css/bootstrap.min.css"

const PageLayout = ({ children }) => {
    return (
        <div className="layout-wrapper">
            <Header className="layout-header" />
            <div className="layout-content">
                {children}
            </div>
            <Footer className="layout-footer" />
        </div>
    )
}

export default PageLayout