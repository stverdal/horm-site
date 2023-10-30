import React, { useEffect, useRef, useState } from "react"
import { Container, Row, Col, Accordion, ButtonGroup, Button, InputGroup, FormControl } from "react-bootstrap"
import Form from "react-bootstrap/Form"
import { useSelector, useDispatch } from "react-redux"
import { addElement, removeElement, decorateElement } from "../features/graph/graphSlice"
import _ from 'lodash';
import Draggable from 'react-draggable';
import { breakText } from "jointjs/src/util"
import { elementSelected, changeElementLabel, closeElementEditor, deleteElement, changeFontSize } from "../features/editor/editorSlice"

import IconSection from "./content/iconsection";

import "../styles/global.css"
import "../styles/content/elementeditor.css"

const ElementEditor = () => {
    const dispatch = useDispatch();
    const editor_slice = useSelector((state) => state.editor);
    //console.log("ELEMENTTUPEDUDE", editor_slice.selectedElement);

    const [iconType, setIconType] = useState("communication")

    const [position, setPosition] = useState(editor_slice.position);
    const [label, setLabel] = useState(editor_slice.selectedElement.attr('text/text') || "");
    const [fontSize, setFontSize] = useState(editor_slice.selectedElement.attr('text/fontSize') || 14);

    const [input, setInput] = useState("")

    useEffect(() => {
        switch(editor_slice.selectedElement.attributes.type) {
            case "cjml.swimlaneElement":
                setIconType("actors");
                break;
            default:
                break;
        }
        //set text to match the label at start.
        setInput(label.replace(/\n|\r/g, ' ').replace(/\s+/g, ' ').trim());
        //setInput(label)
        console.log("Editorslice", editor_slice)
        
      }, [])


    //console.log("Editorslice", editor_slice)

    const onDragEnd = (e) => {
        e.preventDefault();
        //console.log("ONDRAGEND E", e)
        var offsetTop = document.getElementById("editor-wrapper").offsetTop;
        var offsetLeft = document.getElementById("editor-wrapper").offsetLeft;
        //Account for mouses position relative to elementeditor
        setPosition({x: e.pageX - offsetLeft, y: e.pageY - offsetTop});
    }

    const onLabelChange = (e) => {
        //Use textbreak here.
        var wraptext =  breakText(input, {width: 100}, {'fon-size': fontSize})
        dispatch(changeElementLabel(wraptext));
        //setState({ label: e.target.value });
        setLabel(wraptext);
        setInput("");
    }

    const onFontSizeChange = (e) => {
        dispatch(changeFontSize(fontSize));
        var wraptext =  breakText(input, {width: 110}, {'font-size': fontSize})
        dispatch(changeElementLabel(wraptext));

    }

    const handleSubmit = () => {
        var wraptext =  breakText(input, {width: 110}, {'font-size': fontSize})
        dispatch(changeElementLabel(wraptext));
        //setState({ label: e.target.value });
        setLabel(wraptext);
        //setInput("");
    }

    const onDelete = (e) => {
        dispatch(deleteElement());
    }

    const onClose = (e) => {
        dispatch(closeElementEditor());
    }
    
    const onKeyUp = (e) => {
        if (e.charCode === 13) {
            if (e.target.id === "input-form") {
                handleSubmit();
            } else {
                onFontSizeChange();
            }
        }
    }
    return (
        <Draggable
            //position={position}    
            //position={{x: 0, y:0}} 
            defaultPosition={position}
            //onStop={onDragEnd} 
        >
            <Container className="element-editor">
                <Row className="element-editor-title">
                    <h4>Element editor</h4>
                </Row>
                <Row className="element-editor-section">
                    <InputGroup className="mb-3 input-group">
                        <FormControl
                            id="input-form"
                            placeholder="Label"
                            aria-label="Label"
                            aria-describedby="basic-addon2"
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyPress={onKeyUp}
                            as="textarea"
                        />
                    </InputGroup>
                </Row>
                <Row className="element-editor-section">
                    <p>Fontsize</p>
                    <InputGroup className="mb-3 input-group">
                        <FormControl
                            id="fontsize-form"
                            placeholder="Font size"
                            aria-label="Font size"
                            aria-describedby="basic-addon2"
                            value={fontSize}
                            onChange={e => setFontSize(e.target.value)}
                            onKeyPress={onKeyUp}
                            type="number"
                            min="1"
                            max="100"
                        />
                    </InputGroup>
                </Row>
                {(editor_slice.selectedElement.attributes.type !== "cjml.actionElement") ?
                <Row className="element-editor-section">
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Icon</Accordion.Header>
                            <Accordion.Body>
                                <IconSection section={editor_slice.selectedElement.attributes.attrs.info.section} subsection={editor_slice.selectedElement.attributes.attrs.info.subsection}/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row> : null}
                {(editor_slice.selectedElement.attributes.type !== "cjml.swimlaneElement") ?
                <Row className="element-editor-section">
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Security tag</Accordion.Header>
                            <Accordion.Body>
                            <IconSection section={"supplemental"}/>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Row> : null}
                <Row className="element-editor-section">
                    <div className="button-group">
                        <Button variant="success" onClick={onClose}>Close</Button>{' '}
                        <Button variant="danger" onClick={onDelete}>Delete</Button>{' '}
                    </div>
                </Row>
            </Container>
        </Draggable>
    )
}

export default ElementEditor

/*
                <p>ELEMENTEDITOR</p>
                <div className="element-editor-section">
                    <div>
                        <p>Icon selection</p>
                    </div>
                </div>
                <div>{position.x}</div>

                    <label htmlFor="label" className="element-editor-section__label element-editor-section__label--full">Label</label>
                    <textarea
                        id="label"
                        className="element-editor-section__input element-editor-section__input--100"
                        type="text"
                        value={label}
                        onChange={onLabelChange}
                    >
                    </textarea>



*/