import React, { useState, useEffect } from 'react'
import * as joint from 'jointjs'
import { useSelector, useDispatch } from "react-redux"
import { Container} from "react-bootstrap"
import { initGraph } from "../../features/graph/graphSlice"

import "../../styles/global.css"
import "../../styles/pages/editor.css"

function Editor2(props) {
    //var namespace = joint.shapes;
    //var graph = new joint.dia.Graph({}, { cellNamespace: namespace });
    /*
    const [currGraph, setCurrGraph] = useState(null);

    const dispatch = useDispatch();

    const graph = useSelector((state) => state.graph.value)
    console.log("GRAPHHH", graph)

    useEffect(() => {
        dispatch(initGraph())
        console.log("AFTER INIT", graph)
    }, [])

    useEffect(() => {
        console.log(graph)
        var displayed_graph = new joint.dia.Graph();
        if (graph !== null) {
            displayed_graph = graph;
        }
        var paper = new joint.dia.Paper({
            el: document.getElementById("editor"),
            model: displayed_graph, // change
            width: document.getElementById("editor-wrapper").offsetWidth - 10,
            height: document.getElementById("editor-wrapper").offsetHeight - 10,
            gridSize: 1,
            background: {
                color: 'rgba(255, 255, 255, 1)',
            },
            interactive: true
        });

        setCurrGraph(displayed_graph)
        console.log("graph", displayed_graph)

    }, [graph])
    */
    return(
        <div></div>
    )


    /*
    useEffect(() => {
        this.paper = new joint.dia.Paper({
            el: document.getElementById("editor"),
            model: graph, // change
            width: document.getElementById("editor-wrapper").offsetWidth - 10,
            height: document.getElementById("editor-wrapper").offsetHeight - 10,
            gridSize: 1,
            background: {
                color: 'rgba(255, 255, 255, 1)',
            },
            interactive: true,
            cellViewNamespace: namespace
        });
    })
    */
}
