import * as React from "react"
import { useState} from "react"
import { Accordion, InputGroup, Button, FormControl } from "react-bootstrap"

//import EmployeeIcon1 from "../svg/symbols/actors/employee-1.svg"
//import Doctor1 from "../svg/symbols/health/doctor-1.svg"
import IconSection from "./content/iconsection"
import IconGallery from "./content/icongallery"
import "../styles/pages/editor.css"

const Sidebar = ({ graph }) => {

    const [activeSearch, setActiveSearch] = useState(false);
    const [searchInput, setSearchInput] = useState('');

    /*
        <div className="sidebar-wrapper">
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Search diagram elements"
                    aria-label="search diagram elements"
                    aria-describedby="basic-addon2"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                />
                <Button variant="outline-secondary" id="button-addon2">
                    Search
                </Button>
            </InputGroup>

    */

    return (
            <Accordion flush alwaysOpen>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Actors</Accordion.Header>
                    <Accordion.Body>
                        <Accordion.Item eventKey="6">
                            <Accordion.Header>Users</Accordion.Header>
                            <Accordion.Body>
                                <IconSection section="actors" subsection="user" />
                            </Accordion.Body>
                        </Accordion.Item>                
                        <Accordion.Item eventKey="7">
                            <Accordion.Header>Professionals</Accordion.Header>
                            <Accordion.Body>
                                <IconSection section="actors" subsection="professional"/>
                            </Accordion.Body>
                        </Accordion.Item>                
                        <Accordion.Item eventKey="8">
                            <Accordion.Header>Service providers</Accordion.Header>
                            <Accordion.Body>
                                <IconSection section="actors" subsection="service-provider" />
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="9">
                            <Accordion.Header>Technological</Accordion.Header>
                            <Accordion.Body>
                                <IconSection section="actors" subsection="tech" />
                            </Accordion.Body>
                        </Accordion.Item>            
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                    <Accordion.Header>Touchpoints</Accordion.Header>
                    <Accordion.Body className="subaccordion">
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Actions</Accordion.Header>
                            <Accordion.Body>
                                <IconSection section="action" />
                            </Accordion.Body>
                        </Accordion.Item>                
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Communication points</Accordion.Header>
                            <Accordion.Body>
                                <IconSection section="communication" />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                    <Accordion.Header>Cybersecurity</Accordion.Header>
                    <Accordion.Body>
                        <IconSection section="supplemental"/>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
    )
}

export default Sidebar