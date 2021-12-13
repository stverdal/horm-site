import * as React from "react"

import "../../styles/global.css"
import "../../styles/pages/landing.css"
import { Container, Col, Row, ListGroup, ListGroupItem } from "react-bootstrap"



const LandingGuide = () => {
    return (
        <Container className="landing-guide">
            <Row>
                <Col className="landing-guide-column">
                    <Container className="landing-guide-section fw-light">
                        <h3><i>LEARN</i></h3><p>Learn the basics and look at existing models:</p>
                        <ListGroup variant="flush">
                            <ListGroup.Item action className="fw-light">
                                Cybersecurity risks caused by the human element
                            </ListGroup.Item>
                            <ListGroup.Item action className="fw-light">
                                How to use methods and tools
                            </ListGroup.Item>
                            
                        </ListGroup>
                    </Container>
                </Col>
                <Col className="landing-guide-column">
                    <Container className="landing-guide-section fw-light" >
                        <h3 ><i>MAKE</i></h3>
                        <p>Make new models or load existing models:</p>
                        <ListGroup variant="flush">
                            <ListGroup.Item action className="fw-light">Power-point</ListGroup.Item>
                            <ListGroup.Item action className="fw-light">Online diagrams</ListGroup.Item>
                            <ListGroup.Item action href="/editor" className="fw-light">Web app</ListGroup.Item>    
                            
                        </ListGroup>
                    </Container>
                </Col>
            </Row>
        </Container>
    )
}

/*
const LandingGuide = () => {
    return (
        <div className="landing-guide">
            <ul className="landing-guide-items">
                <GuideItem />
                <GuideItem />
                <GuideItem />
            </ul>
        </div>
    )
}
*/
export default LandingGuide