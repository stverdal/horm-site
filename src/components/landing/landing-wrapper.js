import * as React from "react"
import { Container, Row, Col } from "react-bootstrap"
import LandingIntro from "./landing"
import LandingGuide from "./guide"

import "../../styles/pages/landing.css"

const LandingWrapper = () => {
    return (
        <Container fluid className="landing-container">
            <Row>
                <LandingIntro />
            </Row>
            <Row className="landing-guide">
                <LandingGuide />
            </Row>
        </Container>
    )
}

export default LandingWrapper