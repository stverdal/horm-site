function cjmlShapes(joint) {
    console.log("Shaping", joint);
    console.log("shapes", joint.shapes);

    joint.dia.Element.define('cjml.unboxedElement', {
        attrs: {
            linkHandler: {
                refWidth: "225%",
                refHeight: "100%",
                fill: "#FFF",
                fillOpacity: 0,
                refX: "-75%",
                refY: "0",
                magnet: 'true'
            },
            text: {
                text: "Asset",
                refX: "50%",
                refY: "55%",
                textAnchor: "middle",
                textVerticalAnchor: "top"
            },
        }
    }, {
        markup: [
            {
                tagName: "rect",
                selector: "linkHandler"
            },
            {
                tagName: "image",
                selector: "icon",
            },
            {
                tagName: "text",
                selector: "text"
            }
        ]
    });
    joint.dia.Element.define("cjml.swimlaneElement", {
        attrs: {
            body: {
                refX: "0",
                refY: "0",
                refWidth: "100%",
                refHeight: "100%",
                fill: "#F2F2F2",
                stroke: "#D9D9D9",
                magnet: false,
                rx: 5,
                ry: 5,
                strokeWidth: 2,
            },
            innerBody: {
                refX: "10%",
                refY: "10%",
                refWidth: "75%",
                refHeight: "75%",
                fill: "#F2F2F2"
            },
            icon: {
                //refWidth: "5%",
                refHeight: "50%",
                refX: "3%",
                refY: "25%"
            },
            text: {
                refX: "75px",
                refY: "87%",
                textVerticalAnchor: "middle",
                textAnchor: "middle"
            },
        }
    }, {
        markup: [
            {
                tagName: "rect",
                selector: "body"
            },
            {
                tagName: "rect",
                selector: "innerBody"
            },
            {
                tagName: "image",
                selector: "icon"
            },
            {
                tagName: "text",
                selector: "text"
            },
        ]
    });
    joint.dia.Element.define("cjml.commElement", {
        attrs: {
            body: {
                refX: "0",
                refY: "0",
                refWidth: "100%",
                refHeight: "100%",
                fill: "#FFF",
                stroke: "#31859C",
                magnet: true,
                rx: 5,
                ry: 5,
                strokeWidth: 3,
            },
            innerBody: {
                refX: "15%",
                refY: "15%",
                refWidth: "70%",
                refHeight: "70%",
                fill: "#FFF"
            },
            icon: {
                //refWidth: "20%",
                refHeight: "30%",
                refX: "5%",
                refY: "35%"
            },
            text: {
                refX: "40%",
                refY: "20%",
                textVerticalAnchor: "top",
                textAnchor: "left",
            },
            decorator: {
                refHeight: "30%",
                refX: "85%",
                refY: "85%"
            }
        }
    }, {
        markup: [
            {
                tagName: "rect",
                selector: "body"
            },
            {
                tagName: "rect",
                selector: "innerBody"
            },
            {
                tagName: "image",
                selector: "icon"
            },
            {
                tagName: "text",
                selector: "text"
            },
            {
                tagName: "image",
                selector: "decorator"
            }
        ]
    });
    joint.dia.Element.define("cjml.actionElement", {
        attrs: {
            body: {
                refX: "0",
                refY: "0",
                refWidth: "100%",
                refHeight: "100%",
                fill: "#FFF",
                stroke: "#000000",
                magnet: true,
                rx: 5,
                ry: 5,
                strokeWidth: 1,
            },
            innerBody: {
                refX: "15%",
                refY: "15%",
                refWidth: "70%",
                refHeight: "70%",
                fill: "#FFF"
            },
            text: {
                refX: "20%",
                refY: "20%",
                textVerticalAnchor: "top",
                textAnchor: "left",
            },
            decorator: {
                refHeight: "30%",
                refX: "85%",
                refY: "85%"
            }
        }
    }, {
        markup: [
            {
                tagName: "rect",
                selector: "body"
            },
            {
                tagName: "rect",
                selector: "innerBody"
            },
            {
                tagName: "text",
                selector: "text"
            },
            {
                tagName: "image",
                selector: "decorator"
            }
        ]
    });
    console.log("shapes", joint.shapes);
}

export default cjmlShapes;