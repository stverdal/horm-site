import { createSlice } from "@reduxjs/toolkit";
import * as joint from "jointjs"
import iconInfo from "../../components/content/iconinfo"
import { staff_tech1 } from "../../svg/symbols/actors/CJMLSymbolsBase64";

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
    visible: false
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
            state.preparedElement.element = elem;
            state.preparedElement.svg = svg;
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
            var svg = state.preparedElement.svg;
            //var elem = svg.shapeFn(); //get from iconinfo
            var elem = state.preparedElement.element;

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
        }
    }
});
export const { prepareElement, addElement, decorateElement, removeElement} = graphSlice.actions;
export default graphSlice.reducer;