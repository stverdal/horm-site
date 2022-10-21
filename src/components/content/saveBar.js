import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux"
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Accordion, InputGroup, Button, FormControl } from "react-bootstrap"

//import { Graph } from "jointjs/src/dia"

import * as joint from "jointjs"

import "../../styles/content/savebar.css"

const SaveBar = ({saveFile, loadFile}) => {

    const hiddenFileInput = React.useRef(null);

    const handleSave = (e) => {
        e.preventDefault();
        saveFile("cjml_diagram")
    }

    const handleLoad = (e) => {
        e.preventDefault();
    }

    const loadFileJson = (e) => {
        if (e.target.files && e.target.files[0]) {
            var fp = e.target.files[0];
            const reader = new FileReader();

            reader.readAsText(fp);
            reader.onload = () => {
                var data = reader.result;
                console.log(data);
                var jsonGraph = JSON.parse(data,"application/JSON");
                var newGraph = new joint.dia.Graph();
                newGraph.fromJSON(jsonGraph)
                loadFile(newGraph)
            };
        }
    }


    const handleButtonClick = (e) => {
        hiddenFileInput.current.click();
    };
    return (
        <div className="button-wrapper">
            <Button variant="outline-primary" onClick={handleSave}>Save file</Button>{' '}
            <div className="button-wrapper">
                <input type="file" id="file-selector-json" accept="application/JSON" style={{ display: 'none' }} onChange={loadFileJson} ref={hiddenFileInput}></input>
                <label for="file-selector-xml">
                    <Button variant="outline-primary" onClick={handleButtonClick}>Load file</Button>{' '}
                </label>
            </div>
        </div>
    )
}

export default SaveBar;

/*
<Button variant="outline-primary" onClick={handleLoad}>Load file</Button>{' '}
*/