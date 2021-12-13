import * as React from "react"

import "../../styles/global.css"
import "../../styles/pages/landing.css"

import { Container, Row, Col } from "react-bootstrap"

const LandingIntro = () => {
    return (
        <Container>
            <Row className="landing-title">
                <Col className="fw-light">
                    <h1 className="fw-light"><b>The human element in cybersecurity</b></h1>
                </Col>
            </Row>
            <Row>
                <Col className="fw-light landing-text">
                    <h5 className="fw-light"><i>What is this?</i></h5>
                    <ul>
                        <li>The human element is referred to as the biggest internal cybersecurity threat faced by companies.​</li>
                        <li>To help companies identify and understand risks caused by the human element, we introduce the Human and Organisational Risk Modelling (HORM) framework.</li>
                        <li>Through simple visualisations, the HORM framework provides you with methods and tools to raise awareness about cyber security in your company.</li>
                    </ul>
                </Col>
                <Col className="fw-light landing-text">
                    <h5 className="fw-light"><i>What's in it for you?</i></h5>
                    <ul>
                        <li>Understand how our daily activities may result in unwanted incidents</li>
                        <li>Get access to examples of threat scenarios that SMEs are facing.</li>
                        <li>Help communicate this across a broad user group</li>
                        <li>Learn more about how to analyse, forecast and manage cyber security and data protection risks.</li>
                    </ul>
                </Col>
            </Row>
        </Container>
    )
}

export default LandingIntro

/*
    return (
        <div className="landing-intro-wrapper">
            <div className="landing-intro-logo">
                <h1 class="fw-light">Human Organizational Risk Models</h1>
            </div>
            <div className="landing-intro-introduction">
                <p class="lead text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum elementum aliquet. Nunc luctus laoreet urna, a condimentum elit dictum suscipit. Suspendisse ac quam arcu. Aliquam eget semper orci, et gravida leo.</p>
            </div>
        </div>
    )
*/