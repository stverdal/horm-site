import { createSlice } from "@reduxjs/toolkit";
import * as joint from "jointjs"
import iconInfo from "../../components/content/iconinfo"
import { staff_tech1 } from "../../svg/symbols/actors/CJMLSymbolsBase64";

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
    }

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
        },
        changeElementLabel: (state, action) => {
            console.log("Payload.s",action.payload)
            state.selectedElement.attr('text/text', action.payload);
        },
        changeIcon: (state, action) => {
            var { section, id } = action.payload;
            var item = iconInfo[section][id];
            var svg = item["svg"];
            if (section == "communication" || section === "action") {
                state.selectedElement.attr("icon/href", svg.icon);
            } else if (section == "supplemental") {
                state.selectedElement.attr("decorator/href", svg.icon)
            }
        }
    }
});

export const { toggleEditor, startMovePaper, endMovePaper, elementSelected, closeElementEditor, changeElementLabel, deleteElement, changeIcon } = editorSlice.actions;
export default editorSlice.reducer;