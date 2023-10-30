import { createSlice } from "@reduxjs/toolkit";
import iconInfo from "../../components/content/iconinfo"

const initialState = {
    visible: false,
    selectedElement: null,
    position: {
        x: 0,
        y: 0
    },
    data: {
        originalLabel: "",
        section: "",
        subsection: ""
    },
    paperMoving: false,
    pointerCoordinates: {
        x: 0,
        y: 0
    },
    modCounter: 0,

}

export const editorSlice = createSlice({
    name:  "editor",
    initialState,
    reducers: {
        toggleEditor: (state,action) => {
            state.visible = !(state.visible);
        },
        startMovePaper: (state, action) => {
            state.paperMoving = true;
            state.pointerCoordinates = action.payload;
        },
        endMovePaper: (state, action) => {
            state.paperMoving = false;
            //not needed?
        },
        elementSelected: (state, action) => {
            if (!state.visible) {
                console.log("in here boi", action.payload)
                //let {element, event, x, y} = action.payload;
                //console.log("Position", x, y)
                let element = action.payload.targetElement;
                state.position = {
                    x: action.payload.x,
                    y: action.payload.y
                };
                state.data.originalLabel = element.attr('text/text');
                state.selectedElement = element; //unsure if needed
                console.log("ELEMENT", element)
                state.visible = true;
            }   

        },
        closeElementEditor: (state, action) => {
            state.visible = false;
        },
        deleteElement: (state, action) => {
            state.selectedElement.remove();
            state.selectedElement = null;
            state.visible = false;
            state.modCounter += 1;
        },
        changeElementLabel: (state, action) => {
            console.log("Payload.s",action.payload)
            state.selectedElement.attr('text/text', action.payload);
            state.modCounter += 1;
        },
        changeFontSize: (state, action) => {
            console.log("Payload.s",action.payload)
            state.selectedElement.attr('text/font-size', action.payload);
            state.modCounter += 1;
        },
        changeIcon: (state, action) => {
            const { section, id } = action.payload;
            const item = iconInfo[section][id];
            const svg = item["svg"];
            let selectedElement = state.selectedElement;

            if (section === "communication" || section === "action" || section === "actors") {
                console.log("hello", svg.icon);
                selectedElement.attr("icon/href", svg.icon);
            } else if (section === "supplemental") {
                //if (item["id"] === selectedElement.prop("decorator/id")) {
                if (svg.icon === selectedElement.attr("decorator/href")) {
                    console.log("SAME DECORATIR")
                    //selectedElement.removeAttr("decorator/href");
                    //selectedElement.removeAttr("decorator/id");
                    selectedElement.removeAttr("decorator/href")
                } else {
                    console.log("DIFFERENT DECORATOR")
                    //selectedElement = selectedElement.clone().attr("decorator/href", svg.icon).prop("decorator/id", item["id"]);
                    selectedElement.attr("decorator/href", svg.icon)
                }
            }
            state.modCounter += 1;
        }
    }
});

export const { toggleEditor, startMovePaper, endMovePaper, elementSelected, closeElementEditor, changeElementLabel, deleteElement, changeIcon, changeFontSize } = editorSlice.actions;
export default editorSlice.reducer;