import * as React from "react"
import { Accordion, InputGroup, Button, FormControl } from "react-bootstrap"

import "../styles/pages/editor.css"

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper">
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search icons"
                    aria-label="search icons"
                    aria-describedby="basic-addon2"
                />
                <Button variant="outline-secondary" id="button-addon2">
                    Search
                </Button>
            </InputGroup>
            <Accordion flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>General</Accordion.Header>
                    <Accordion.Body>
                        ICONS
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Actors</Accordion.Header>
                    <Accordion.Body>
                        ICONS
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Communication channels</Accordion.Header>
                    <Accordion.Body>
                        ICONS
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                    <Accordion.Header>Customer experience</Accordion.Header>
                    <Accordion.Body>
                        ICONS
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                    <Accordion.Header>Health</Accordion.Header>
                    <Accordion.Body>
                        ICONS
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header>Cybersecurity</Accordion.Header>
                    <Accordion.Body>
                        ICONS
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export default Sidebar