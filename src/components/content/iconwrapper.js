import React, {useEffect, useState} from "react"
import * as joint from "jointjs"
import { useSelector, useDispatch } from "react-redux"

import "../../styles/content/iconsection.css"
import { prepareElement } from "../../features/graph/graphSlice"
import { changeIcon } from "../../features/editor/editorSlice"

const IconWrapper = ({section, item }) => {

    const dispatch = useDispatch();
    const editor_slice = useSelector((state) => state.editor);


    const handlePrepareElement = () => {
        if (!editor_slice.visible) {
            //Blocks dragging when element editor visible
            console.log("Handling")
            dispatch(prepareElement({ section: section, id: item["id"] }))
            //dispatch(addElement({graph: graph.toJSON()}))
        }
    }
    
    const handleClick = () => {
        console.log("CLICKED");
        if (editor_slice.visible) {
            dispatch(changeIcon({ section: section, id: item["id"] }))
        }
    }
    
    return (
        <div className="icon-wrapper" 
        draggable
        onClick={handleClick}
        onDragStart={handlePrepareElement}
        >
            <img 
                src={item.svg.icon}>
            </img>
        </div>
    )
}

export default IconWrapper

//{item["icon"]}