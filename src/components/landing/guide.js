import * as React from "react"
import { Link } from "gatsby"

import "../../styles/global.css"
import "../../styles/pages/landing.css"
import { Container, Col, Row, ListGroup, ListGroupItem } from "react-bootstrap"



const LandingGuide = () => {
    return (
        <Container className="landing-guide">
            <Row>
                <Col className="landing-guide-column">
                    <Container className="landing-guide-section fw-light">
                        <h3><i>Learn</i></h3>
                        <p>Learn the basics and look at existing models:</p>
                        <ListGroup variant="flush">
                            <ListGroup.Item action href="/horm/cybersecurity" className="fw-light">
                                Cybersecurity risks caused by the human element
                            </ListGroup.Item>
                            <ListGroup.Item action href="/horm/learn-cjml" className="fw-light">
                                How to use methods and tools
                            </ListGroup.Item>
                            <ListGroup.Item action href="/game2" className="fw-light">
                                Learn by playing a game
                            </ListGroup.Item>
                            
                        </ListGroup>
                    </Container>
                </Col>
                <Col className="landing-guide-column">
                    <Container className="landing-guide-section fw-light" >
                        <h3 ><i>Create</i></h3>
                        <p>Make new models or load existing models:</p>
                        <ListGroup variant="flush">
                            <ListGroup.Item action href="/horm/powerpoint" className="fw-light">PowerPoint</ListGroup.Item>
                            <ListGroup.Item action href="https://cjml.no/horm/online-diagrams" className="fw-light">Online Diagrams</ListGroup.Item>
                            <ListGroup.Item action href="/horm/editor" className="fw-light">Web app</ListGroup.Item>    
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