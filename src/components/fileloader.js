import * as React from "react"
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux"
import Button from 'react-bootstrap/Button';
import * as joint from "jointjs"
import { breakText } from "jointjs/src/util"

import "../styles/pages/editor.css"
import "../styles/content/fileloader.css"
import cjmlShapes from "./content/cjmlshapes"
import iconInfo from "./content/iconinfo"
import { service_provider_1 } from "../svg/symbols/actors/CJMLSymbolsBase64";

const FileLoader = ({ loadGraph, attachTools  }) => {
    const [isLoading, setLoading] = useState(false);
    const hiddenFileInput = React.useRef(null);

    useEffect(() => {
        if (window !== undefined) {
            window.joint = joint;
        }
        cjmlShapes(joint);
    });

    /*
    const [currJourneyVars, setCurrJourneyVars] = useState({
        id: "",
        title: "",
        summary_short: "",
        summary_long: "",
        references: {
            planned: "",
            compliance: "",

        },
        status: "",
        owner: "",
        cancelled: false,
        experience: "",
        rating: 0,
    })

    const [currJourneyVars, setCurrJourneyVars] = useState({
        JourneyID: "",
        JourneyTitle: "",
        JourneyShortSummary: "",
        JourneyLongSummary: "",
        JourneyReferences: {
            planned: "",
            compliance: "",

        },
        JourneyStatus: {
            value: ""
        },
        JourneyOwner: {
            refID: ""
        },
        JourneyCancelled: false,
        ActualExperience: "",
        ActualExperienceRating: 0,
    });
    
    useEffect(()=> {
        console.log("Hello there",currJourneyVars)
    }, [currJourneyVars])

    */
    const generateTouchpoint = (tpVars, initiator, receiver) => {
        //Every touchpoint needs an actor. In the case of swimlanes, it will be attached.
        //Might have to seperate communicationpoint vs actions
        var touchpointList = [];
        var chosenTouchpoint;
        var offsetX = 200;
        var offsetY = 15;
        var communication = tpVars.touchpointType == "CommunicationPoint"
        console.log("INITREC",tpVars, initiator,receiver);
        //Need to change the selection process?
        switch (tpVars["channel"]["channelName"]) {
            case "telephone":
                chosenTouchpoint = "telephone_1"
                break;
            case "email":
                chosenTouchpoint = "email_1"
                break;
            case "InternetApplication":
                chosenTouchpoint = "internet_globe"
                break;
            case "package":
                chosenTouchpoint = "letter_1"
                break;
            case "cardpayment":
                chosenTouchpoint = "payment_1"
                break;    
            default:
                chosenTouchpoint = "chat"
        };
        var element = iconInfo["communication"][chosenTouchpoint];
        var svg = element["svg"];
        var touchpoint = svg.shapeFn();
        touchpoint.resize(svg["width"], svg["height"]);
        //Account for other touchpoints in swimlane.
        //Account for reciever touchpoint
        //Should go by time instead. TODO
        var numEmbedsInit = initiator.changed.embeds ? initiator.changed.embeds.length + 1 : 1;
        var numEmbedsRec = 1;
        if (communication) {
            numEmbedsRec = receiver.changed.embeds ? receiver.changed.embeds.length + 1 : 1;
            console.log("COMM",numEmbedsRec)
        } else {
            console.log("ACTION", numEmbedsRec)
        }
        //console.log("MATH MAX",Math.max(numEmbedsInit, numEmbedsRec), numEmbedsInit, numEmbedsRec);
        touchpoint.position(initiator.attributes.position.x + (offsetX * Math.max(numEmbedsInit, numEmbedsRec)), initiator.attributes.position.y + offsetY); //store in var
        touchpoint.attr("icon/href", svg.icon)
        initiator.embed(touchpoint);
        touchpoint.attr("text/text", breakText(tpVars.initiatorLabel, {width: 100}));
        touchpointList.push(touchpoint)

        if (!communication) {
            //If action return now
            return touchpointList;    
        } else {
            //if communication we need the receiving element and the link
            var recTouchpoint = svg.shapeFn(); //same icon
            recTouchpoint.resize(svg["width"], svg["height"]);
            recTouchpoint.position(initiator.attributes.position.x + (offsetX * Math.max(numEmbedsInit, numEmbedsRec)), receiver.attributes.position.y + offsetY);
            recTouchpoint.attr("icon/href", svg.icon);
            receiver.embed(recTouchpoint);
            recTouchpoint.attr("text/text", breakText(tpVars.recieverLabel, {width: 100}));
            touchpointList.push(recTouchpoint)

            //LINK
            var link = new joint.shapes.standard.Link();
            link.source(touchpoint);
            link.target(recTouchpoint);
            touchpointList.push(link);

            return touchpointList;
        }
    }

    const generateSwimlane = (actor, x, y) => {
        //pick actor based on type.
        var chosenActor;
        switch (actor["ActorType"]) {
            case "EndUser":
                chosenActor = "user_1"
                break;
            case "ServiceProvider":
                chosenActor = "service_provider_1"
                break;
            default:
                chosenActor = "user_1"

        }
        var element = iconInfo["actors"][chosenActor];
        var svg = element["svg"];
        var swimlane = svg.shapeFn();
        swimlane.resize(svg["width"], svg["height"]);
        swimlane.position(x, y);
        swimlane.attr("icon/href", svg.icon);
        swimlane.attr('text/text', actor.ActorName);
        
        return swimlane;
    }

    const assignLinks = () => {

    }

    const buildGraph = (journeyVars) => {
        //Recieves result of parsing the xml.
        //Should not be here?
        //Build both and store in store?
        //Store xml and build on request? <--
        console.log("BUILDGRAPH", journeyVars);
        //Find actors. Make swimlane for actors.
        //Create touchpoints. add touchpoints to correct actors.
        var newGraph = new joint.dia.Graph();
        //Store a start coordinate. Start at 0 for now.
        //Add actors
        var x = 0;
        var y = 0;
        var actorList = {};
        var touchpointList = [];
        for (let actor of journeyVars["Actors"]) {
            //console.log("actor",actor);
            var swimlane = generateSwimlane(actor, x, y);
            swimlane.addTo(newGraph); //might postpone?
            actorList[actor.refID] = swimlane;
            y = y + 200;
        }
        for (let tp of journeyVars["Touchpoint"]) {
            //Find actors involved.
            var retTouchpoint = generateTouchpoint(tp, actorList[tp["initiator"]["refID"]], actorList[tp["reciever"]["refID"]])
            for (let touchpoint in retTouchpoint) {
               touchpointList.push(touchpoint);
                //touchpoint.addTo(newGraph);
            }
            console.log("RetRouchpoints", retTouchpoint);
            //touchpointList.push(touchpoint);
            //touchpoint.addTo(newGraph);
            newGraph.addCell(retTouchpoint);
        }

        loadGraph(newGraph);

    }

    const translateXml = (xmlDoc) => {
        //CHECK XML AGAINST XSD <-- get from Ragnhild

        //ALGO
        //For now, only plot actual journeys.,
        //Loop through each actual journey (only one for now.)
        var numActualJourneys = parseInt(xmlDoc.getElementsByTagName("ActualJourneyCluster")[0].children[2].textContent);
        console.log(xmlDoc.getElementsByTagName("ActualJourneyCluster")[0].children)
        //First actual journey
        var currJourney;
        if (numActualJourneys > 0) {
            //Only first journey for now.
            currJourney = xmlDoc.getElementsByTagName("ActualJourneyCluster")[0].children[3];
            console.log("Curr journey children",currJourney.children)
            var currJourneyVars = {
                JourneyID: "",
                JourneyTitle: "",
                JourneyShortSummary: "",
                JourneyLongSummary: "",
                JourneyReferences: {
                    PlannedReference: {
                        refID: "",
                        JourneyCompliance: ""
                    }
        
                },
                JourneyStatus: {
                    value: ""
                },
                JourneyOwner: {
                    refID: ""
                },
                JourneyCancelled: false,
                ActualExperience: "",
                ActualExperienceRating: 0,
                Actors: [
                    //To be filled with actors containing ActorType, refID, isVirtual, ActorName and ActorDescription
                ],
                Touchpoint: [
                    //Add touchpoints to
                    //
                    //
                    //
                    //
                    //
                ]
            }
            //Loop through all elements in journey, fill in values into state.
            var nTouchPoints = 0
            for (let tag of currJourney.children) {
                //If order of tags are static and can be checked with xsd, we can place by index.
                //For now, we use a switch to assure correct assignment
                
                switch(tag.tagName) {
                    /*
                    case "JourneyID":
                        console.log("case 1", tag.textContent);
                        setCurrJourneyVars(previousState => {
                            console.log("inside setter, tag", tag)
                            return {...previousState, id: tag.textContent}
                        })
                        break;
                    case "JourneyTitle":
                        console.log("case 2");
                        setCurrJourneyVars(previousState => {
                            return {...previousState, title: tag.textContent}
                        })
                        break;
                    case "JourneyShortSummary":
                        console.log("case3 ");
                        setCurrJourneyVars(previousState => {
                            return {...previousState, summary_short: tag.textContent}
                        })
                        break;
                    case "JourneyLongSummary":
                        console.log("case 4");
                        setCurrJourneyVars(previousState => {
                            return {...previousState, summary_long: tag.textContent}
                        })
                        break; */
                    case "JourneyReferences":
                        console.log("case 5");
                        currJourneyVars[tag.tagName]["PlannedReference"]["refID"] = tag.children[0].attributes[0].value;
                        currJourneyVars[tag.tagName]["PlannedReference"]["JourneyCompliance"] = tag.children[0].attributes[1].value;
                        //could add an actual refernce to the planned journey as well. TODO
                        break;
                    case "JourneyStatus":
                        console.log("case 6");
                        currJourneyVars[tag.tagName] = tag.lastChild.localName;
                        break;
                    case "JourneyOwner":
                        console.log("case 7");
                        currJourneyVars[tag.tagName]["refID"] = tag.attributes[0].value;
                        break;
                    case "JourneyCancelled":
                        console.log("case 8");
                        currJourneyVars[tag.tagName] = eval(tag.attributes[0].value);
                        break;
                        /*
                    case "ActualExperience":
                        console.log("case9 ");
                        setCurrJourneyVars(previousState => {
                            return {...previousState, experience: tag.textContent}
                        })
                        break;*/
                    case "ActualExperienceRating":
                        console.log("case 10");
                        currJourneyVars[tag.tagName] = parseInt(tag.textContent);
                        break;
                    case "Actors":
                        console.log("Actors")
                        console.log("Actors",tag)
                        var actorList = [];
                        for (let actor of tag.children) {
                            console.log("actor",actor);
                            actorList.push({
                                ActorType: actor.localName,
                                refID: actor.attributes[0].value,
                                isVirtual: actor.attributes[1].value,
                                ActorName: actor.children[0].textContent,
                                ActorDescription: actor.children[1].textContent
                            })
                        }
                        currJourneyVars[tag.tagName] = actorList;
                        break;
                    case "Touchpoint":
                        //counting touchpoints
                        nTouchPoints = nTouchPoints + 1;
                        console.log("Touchpoints", tag);
                        //might have to change to a switch.
                        var tp = {
                            touchpointID: tag.attributes[0].value,
                            touchpointType: tag.children[0].localName,
                            initiator: {
                                refID: ""

                            },
                            initiatorLabel: "",
                            object: "",
                            icon: "",
                            touchpointStatus: "",
                            touchpointCompliance: {
                                refID: ""
                            },
                            reciever: {
                                refID: ""
                            },
                            recieverLabel: "",
                            channel: {
                                isSynchronous: "",
                                channelName: "",
                            },
                            message: {
                                messageContent: "",
                                keyMessageContent: "",
                                derivedMessageContent: ""
                            },
                            timestamp: {
                                completed: "",
                                time: ""
                            },
                            actualExperience: "",
                            actualExperienceRating: ""
                        };
                        for (let attribute of tag.children[0].children) {
                            console.log("attr",attribute.localName)
                            //switch
                            switch (attribute.localName) {
                                case "Initiator":
                                    tp["initiator"]["refID"] = attribute.attributes[0].value;
                                    break;
                                case "InitiatorLabel":
                                    tp["initiatorLabel"] = attribute.textContent;
                                    break;
                                case "Receiver":
                                    tp["reciever"]["refID"] = attribute.attributes[0].value;
                                    break;
                                case "ReceiverLabel":
                                    tp["recieverLabel"] = attribute.textContent;
                                    break;
                                case "Object":
                                    tp["object"] = attribute.textContent;
                                    break;
                                case "ITSystem":
                                    //Should be changed to encompass all icon types.
                                    tp["icon"] = attribute.localName;
                                    break;
                                case "TouchpointStatus":
                                    tp["touchpointStatus"] = attribute.lastChild.localName;
                                    break;
                                case "TouchpointCompliance":
                                    console.log("compliance", attribute.lastChild.attributes[0].value);
                                    tp["touchpointCompliance"]["refID"] = attribute.lastChild.attributes[0].value;
                                    break;
                                case "Channel":
                                    tp["channel"]["isSynchronous"] = attribute.attributes[0].value;
                                    tp["channel"]["channelName"] = attribute.children[0].textContent;
                                    break;
                                case "Message":
                                    //hardcoded
                                    tp["message"]["messageContent"] = attribute.children[0].textContent;
                                    tp["message"]["keyMessageContent"] = attribute.children[1].textContent;
                                    tp["message"]["derivedMessageContent"] = attribute.children[2].textContent;
                                    break;
                                case "Timestamp":
                                    tp["timestamp"]["completed"] = attribute.lastChild.localName;
                                    tp["timestamp"]["time"] = attribute.lastChild.textContent;
                                    break;
                                case "ActualExperience":
                                    tp["actualExperience"] = attribute.textContent;
                                    break;
                                case "ActualExperienceRating":
                                    tp["actualExperienceRating"] = parseInt(attribute.textContent);
                                    break;
                                default:
                                    console.log("New attribute found: ", attribute.localName);
                            }
                        }
                        currJourneyVars["Touchpoint"].push(tp);
                        break;
                    default:
                        //Generic
                        currJourneyVars[tag.tagName] = tag.textContent

                } 
            }
            console.log("Current vars", currJourneyVars)
            
        }
    
        //Send information to build function
        buildGraph(currJourneyVars);
        //console.log(xmlDoc.getElementsByTagName("JourneyID")[0].childNodes[0].nodeValue);
    }

    const loadFileXml = (e) => {
        if (e.target.files && e.target.files[0]) {
            var fp = e.target.files[0];
            console.log("file", fp);
            const reader = new FileReader();
            const parser = new DOMParser();
            reader.readAsText(fp);
            reader.onload = () => {
                var data = reader.result;
                console.log(data);
                var xmlDoc = parser.parseFromString(data,"text/xml");
                translateXml(xmlDoc);
            };
        }
      }

      /*
    useEffect(() => {
        if (isLoading) {
          loadFile().then(() => {
            setLoading(false);
          });
        }
      }, [isLoading]);
      */

    const handleClick = () => setLoading(true);

    const handleButtonClick= event => {
        hiddenFileInput.current.click();
    };

    return (
        <div className="xml-button-wrapper">
            <Button variant="outline-primary" className="button-wrapper" >Save XML file</Button>{' '}
            <div className="button-wrapper">
                <input type="file" id="file-selector-xml" accept="text/xml" style={{display: 'none'}} onChange={loadFileXml} ref={hiddenFileInput}></input>
                <label for="file-selector-xml">
                    <Button variant="outline-primary" onClick={handleButtonClick}>Load XML file</Button>{' '}
                </label>
            </div>
        </div>

    )
}

export default FileLoader


/*

        <div>
            <label for="file-selector-xml">Select a file:</label>
            <input type="file" id="file-selector-xml" accept="text/xml" onChange={loadFileXml}></input>
        </div>


    return (
        <div className="button-wrapper">
            <Button
                variant="primary"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
            >
                {isLoading ? 'Loading…' : 'Click to load'}
            </Button>
        </div>
    )

*/