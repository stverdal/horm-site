import { createSlice } from "@reduxjs/toolkit";
import * as joint from "jointjs"
import iconInfo from "../../components/content/iconinfo"
import { staff_tech1 } from "../../svg/symbols/actors/CJMLSymbolsBase64";
import { serializeFunctions } from "../../components/utils/utils.js"


const initialState2 = {
    value: null,
}

const initialState = {
    graph: "",
    newElement: null,
    preparedElement: {
        element: null,
        svg: null,
        section: "",
        subsection: "",
        id: "",
        uid: "",
    },
    newDecorator: null,
    visible: false,
    cellResizing: false,
    startPosition: {
        x: 0,
        y: 0,
    },
    modCounter: 0,
}

export const graphSlice = createSlice({
    name:  "graph",
    initialState,
    reducers: {
        prepareElement: (state,action) => {
            console.log("preparing",action.payload);
            //console.log("Checking", iconInfo[action.payload.section][action.payload.id]["svg"]);
            
            state.newElement = action.payload;
            
            //Create element and place in state.
            
            var { section, id } = action.payload;
            var item = iconInfo[section][id];
            var svg = item["svg"];
            
            //var elem = svg.shapeFn(); //get from iconinfo


            //elem.position(x, y);
            //elem.resize(svg["width"], svg["height"]); //could send as well.
            //elem.attr("text/text", item.description)
            //elem.addTo(graph);
            //get from iconinfo
            //if (svg.attrs) {
            //    elem.attr(svg.attrs) //TODO
            //}
            //elem.attr("icon/href", svg.icon)
            //state.newElement.element = elem;
            //state.newElement.svg = svg;
            //console.log("Element",elem);
            //var sfelem = serializeFunctions(elem);
            //console.log("serialized functions", sfelem);
            //console.log("complete", JSON.stringify(sfelem));
            //console.log("Contrast", JSON.stringify(elem));

            //state.preparedElement.element = JSON.stringify(sfelem)
            state.preparedElement.id = id;
            //state.preparedElement.svg = JSON.stringify(svg);
            state.preparedElement.section = section;
            state.preparedElement.subsection = item["subsection"];

        },
        addElement: (state, action) => {
            if (!state.newElement) {
                return;
            }
            //console.log("THIS IS THE ELEMENT height",state.newElement.height)
            console.log("Payload",action.payload)
            console.log("Payload graph", action.payload.graph)
            var {graph, x, y, element} = action.payload;
            //var { section, id } = state.newElement;
            //var item = iconInfo[section][id];
            //var svg = item["svg"];
            //var elem = state.newElement.element;


            //var svg = state.preparedElement.svg;
            
            var item = iconInfo[state.preparedElement.section][state.preparedElement.id];
            var svg = item["svg"];
            
            //var elem = svg.shapeFn(); //get from iconinfo
            //state.preparedElement.uid = elem.get("id");
            //console.log(elem);


            //elem.position(x, y);
            element.resize(svg["width"], svg["height"]); //could send as well.
            //var elem = svg.shapeFn(); //get from iconinfo
            //var elem = state.preparedElement.element;

            element.position(x, y);
            //elem.resize(svg["width"], svg["height"]);
            //elem.resize(state.newElement.width, state.newElement.height); //could send as well.
            element.addTo(graph);
            //get from iconinfo
            if (svg.attrs) {
                element.attr(svg.attrs) //TODO
            }
            element.attr("icon/href", svg.icon);
            element.attr("info/section", state.preparedElement.section);
            element.attr("info/subsection", state.preparedElement.subsection);
            state.modCounter += 1;


            state.graph = graph.toJSON();
        },
        decorateElement: (state, action) => {
            console.log("decorating")
            var target = action.payload;
            var { section, id } = state.newElement;
            var item = iconInfo[section][id];
            var svg = item["svg"];
            //console.log("TARGET", target.targetElement.parentElement)
            //console.log(target.targetElement.parentElement.childNodes)
            //target.targetElement.parentElement.childNodes.href = svg.icon;
            //target.targetElement.attr("body/fill", "#fe988d");
            if (target.targetElement.attr("decorator/href") === svg.icon) {
                target.targetElement.removeAttr("decorator/href");
            } else {
                target.targetElement.attr("decorator/href", svg.icon)
            }
            state.modCounter += 1;
            
        },
        removeElement: (state, action) => {
            console.log("remove element")
        },
        startMoveElement: (state, action) => {
            state.startPosition = action.payload;
        }
        
    }
});
export const { prepareElement, addElement, decorateElement, removeElement, startMoveElement} = graphSlice.actions;
export default graphSlice.reducer;

/*
import { createSlice } from "@reduxjs/toolkit";
import * as joint from "jointjs"
import iconInfo from "../../components/content/iconinfo"
import { staff_tech1 } from "../../svg/symbols/actors/CJMLSymbolsBase64";
import { serializeFunctions } from "../../components/utils/utils.js"


const initialState2 = {
    value: null,
}

const initialState = {
    graph: "",
    newElement: null,
    preparedElement: {
        element: null,
        svg: null,
        section: "",
        subsection: "",
    },
    newDecorator: null,
    visible: false,
    cellResizing: false,
    startPosition: {
        x: 0,
        y: 0,
    }
}

export const graphSlice = createSlice({
    name:  "graph",
    initialState,
    reducers: {
        prepareElement: (state,action) => {
            console.log("preparing",action.payload);
            //console.log("Checking", iconInfo[action.payload.section][action.payload.id]["svg"]);
            
            state.newElement = action.payload;
            
            //Create element and place in state.
            
            var { section, id } = action.payload;
            var item = iconInfo[section][id];
            var svg = item["svg"];
            
            var elem = svg.shapeFn(); //get from iconinfo


            //elem.position(x, y);
            elem.resize(svg["width"], svg["height"]); //could send as well.
            //elem.attr("text/text", item.description)
            //elem.addTo(graph);
            //get from iconinfo
            //if (svg.attrs) {
            //    elem.attr(svg.attrs) //TODO
            //}
            //elem.attr("icon/href", svg.icon)
            //state.newElement.element = elem;
            //state.newElement.svg = svg;
            console.log("Element",elem);
            var sfelem = serializeFunctions(elem);
            console.log("serialized functions", sfelem);
            console.log("complete", JSON.stringify(sfelem));
            console.log("Contrast", JSON.stringify(elem));

            state.preparedElement.element = JSON.stringify(sfelem)
            state.preparedElement.id = id;
            //state.preparedElement.svg = JSON.stringify(svg);
            state.preparedElement.section = section;
            state.preparedElement.subsection = item["subsection"];

        },
        addElement: (state, action) => {
            if (!state.newElement) {
                return;
            }
            //console.log("THIS IS THE ELEMENT height",state.newElement.height)
            console.log("Payload",action.payload)
            console.log("Payload graph", action.payload.graph)
            var {graph, x, y} = action.payload;
            //var { section, id } = state.newElement;
            //var item = iconInfo[section][id];
            //var svg = item["svg"];
            //var elem = state.newElement.element;


            //var svg = state.preparedElement.svg;
            
            var item = iconInfo[state.preparedElement.section][state.preparedElement.id];
            var svg = item["svg"];
            
            var elem = svg.shapeFn(); //get from iconinfo


            //elem.position(x, y);
            elem.resize(svg["width"], svg["height"]); //could send as well.
            //var elem = svg.shapeFn(); //get from iconinfo
            //var elem = state.preparedElement.element;

            elem.position(x, y);
            //elem.resize(svg["width"], svg["height"]);
            //elem.resize(state.newElement.width, state.newElement.height); //could send as well.
            elem.addTo(graph);
            //get from iconinfo
            if (svg.attrs) {
                elem.attr(svg.attrs) //TODO
            }
            elem.attr("icon/href", svg.icon);
            elem.attr("info/section", state.preparedElement.section);
            elem.attr("info/subsection", state.preparedElement.subsection);

            state.graph = graph.toJSON();
        },
        decorateElement: (state, action) => {
            console.log("decorating")
            var target = action.payload;
            var { section, id } = state.newElement;
            var item = iconInfo[section][id];
            var svg = item["svg"];
            //console.log("TARGET", target.targetElement.parentElement)
            //console.log(target.targetElement.parentElement.childNodes)
            //target.targetElement.parentElement.childNodes.href = svg.icon;
            console.log("SLASKD:LSK", target)
            //target.targetElement.attr("body/fill", "#fe988d");
            target.targetElement.attr("decorator/href", svg.icon)
        },
        removeElement: (state, action) => {
            console.log("remove element")
        },
        startMoveElement: (state, action) => {
            state.startPosition = action.payload;
        }
        
    }
});
export const { prepareElement, addElement, decorateElement, removeElement, startMoveElement} = graphSlice.actions;
export default graphSlice.reducer;



*/