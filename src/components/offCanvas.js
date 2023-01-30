import React, { useState } from 'react';
import { Offcanvas } from 'react-bootstrap';
import { Accordion, InputGroup, Button, FormControl } from "react-bootstrap";


import iconInfo from "./content/iconinfo";
import "../styles/content/offcanvas.css";

const OffCanvas = () => {
    //const dispatch = useDispatch();
    //const cjml_slice = useSelector((state) => state.cjml);

    const [show, setShow] = useState(true);

    const [partyName, setPartyName] = useState("Party");
    const [assetName, setAssetName] = useState("Asset");

    const [partyInput, setPartyInput] = useState("");
    const [assetInput, setAssetInput] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const onKeyUp = (e) => {
        if (e.charCode === 13) {
            if (e.target.name === "partyForm") {
                setPartyName(partyInput);
                setPartyInput("")
            } else if (e.target.name === "assetForm") {
                setAssetName(assetInput)
                setAssetInput("")
            }
        }
    }

    return (
        <div>
            <Offcanvas show={show} onHide={handleClose}>
            </Offcanvas>
        </div>
    );
}

export default OffCanvas;


/*


 <div>
            <Button variant="primary" onClick={handleShow} className="offcanvas-button">
                〉
            </Button>
            <Offcanvas show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Journey values</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className="offcanvas-section">
                        <h4>Select Party</h4>
                        <p>
                            When creating a CJML diagram for the purpose of risk assessment, we need to specify on whose behalf the risk is asessed.
                        </p>
                        <div className="image-wrapper">
                            {iconInfo["actors"]["employee_1"].icon}
                        </div>
                        <div className='party-name'>
                            {partyName}
                        </div>
                        <InputGroup className="mb-3 input-group">
                            <FormControl
                                placeholder="Set Party name"
                                aria-label="Set Party name"
                                aria-describedby="basic-addon2"
                                name="partyForm"
                                value={partyInput}
                                onChange={e => setPartyInput(e.target.value)}
                                onKeyPress={onKeyUp}
                            />
                            <Button
                                variant="outline-secondary"
                                id="button-addon2"
                                onClick={() => { setPartyName(partyInput); setPartyInput("") }}
                            >
                                Set
                            </Button>
                        </InputGroup>
                    </div>
                    <breakline />
                    <div className="offcanvas-section">
                        <h4>Select Asset</h4>
                        <p>
                            An asset is what we consider to be at risk for the purposes of the risk assessment.
                            It can be anything that could be harmed as a result of the procedings of the customer journey.
                        </p>
                        <div className="image-wrapper">
                            <img className="offcanvas-image" src={iconInfo["supplemental"]["asset"].svg.icon}></img>
                        </div>
                        <div className='asset-name'>
                            {assetName}
                        </div>
                        <InputGroup className="mb-3 input-group">
                            <FormControl
                                placeholder="Set Asset name"
                                aria-label="Set Asset name"
                                aria-describedby="basic-addon2"
                                value={assetInput}
                                name="assetForm"
                                onChange={e => setAssetInput(e.target.value)}
                                onKeyPress={onKeyUp}
                            />
                            <Button
                                variant="outline-secondary"
                                id="button-addon2"
                                onClick={() => { setAssetName(assetInput); setAssetInput("") }}
                            >
                                Set
                            </Button>
                        </InputGroup>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>

        */
