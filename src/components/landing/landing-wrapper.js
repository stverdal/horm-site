import * as React from "react"
import { Container, Row, Col } from "react-bootstrap"
import LandingIntro from "./landing"
import LandingGuide from "./guide"

const LandingWrapper = () => {
    return (
        <Container fluid>
            <Row>
                <LandingIntro />
            </Row>
            <Row>
                <LandingGuide />
            </Row>
        </Container>
    )
}

export default LandingWrapper