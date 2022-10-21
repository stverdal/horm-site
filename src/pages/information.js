import * as React from "react"
import PageLayout from "../components/layout"

import "../styles/global.css"
import "../styles/pages/information.css"

const InformationPage = () => {
    return (
      <PageLayout>
        <div className="information-wrapper">
            <div className="information-title">
                <h2 className="fw-light">About</h2>
            </div>
            <div className="information-block">
                <p className="lead text-muted">The Human and Organizational Risk Modelling framework aims at providing a comprehensible and easy to use framework for capturing risks ordinary people may be exposed to. The framework aims specifically to help SMEs in this task. </p>
            </div>
            <div className="information-block">
                <p className="lead text-muted">The HORM framework is being developed under the <a href="https://cyberkit4sme.eu/">CyberKit4SME</a> EU H2020 project, from 2021 and work is still in progress. All contents of this website, including tools and courses, are published under the <a href="https://creativecommons.org/licenses/by-sa/4.0/ ">CC BY-SA 4.0 license</a>.</p>
            </div>
            <div className="information-block centered">
                <p className="lead text-muted">HORM is developed by:</p>
                <ul>
                    <li><a href="https://www.sintef.no/en/all-employees/employee/ragnhild.halvorsrud/">Ragnhild Halvorsrud</a></li>
                    <li><a href="https://www.sintef.no/en/all-employees/employee/konstantinos.boletsis/">Konstantinos Boletsis</a></li>
                    <li><a href="https://www.sintef.no/en/all-employees/employee/simeon.tverdal/">Simeon Tverdal</a></li>
                    <li><a href="https://www.sintef.no/en/all-employees/employee/gencer.erdogan/">Gencer Erdogan</a></li>
                </ul>
            </div>
            <div className="information-block centered">
                <p className="lead text-muted">SINTEF, Department for Sustainable Communication Technologies.</p>
            </div>
        </div>
      </PageLayout>        
    )
}

export default InformationPage