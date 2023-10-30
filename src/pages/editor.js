import React, { useEffect, useRef, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import * as joint from "jointjs"
import { useSelector, useDispatch } from "react-redux"
import { Provider } from "react-redux"
import { addElement, removeElement, decorateElement, setCellResizing, startMoveElement } from "../features/graph/graphSlice"
//import { toggleOffCanvas} from "../features/cjml/cjmlSlice"
import editorSlice, { elementSelected, toggleEditor, startMovePaper, endMovePaper } from "../features/editor/editorSlice"
import _ from 'lodash';
import Button from 'react-bootstrap/Button';


import PageLayout from "../components/layout"
import Sidebar from "../components/sidebar"
//import FileLoader from "../components/fileloader"
import iconInfo from "../components/content/iconinfo"
import ElementEditor from "../components/elementeditor"
//import OffCanvas from "../components/offCanvas"
import SaveBar from "../components/content/saveBar"
import ClearBar from "../components/content/clearbar"
import SpyderBar from "../components/content/spyderbar"


//import Editor from "../components/editor/editor"

import "../styles/global.css"
import "../styles/pages/editor.css"
import cjmlShapes from "../components/content/cjmlshapes"
import { parsePath, StaticQueryDocument } from "gatsby"
import { deserializeFunctions } from "../components/utils/utils"

const EditorPage = () => {

  const [currGraph, setCurrGraph] = useState(null);
  //const currGraph = new joint.dia.Graph();
  //const [paper, setPaper] = useState(null);
  const [flag, setFlag] = useState(false);
  const [paper, setPaper] = useState(null);

  //const [increaseElementSize, setIncreaseElementSize] = useState(false);
  var paperMoveX = 0;
  var paperMoveY = 0;
  var increaseElementSize = false

  const dispatch = useDispatch();
  const graph_slice = useSelector((state) => state.graph);
  const editor_slice = useSelector((state) => state.editor);

  const blankPointerUp = (e) => {
    console.log("UPPPP")
  };


  useEffect(() => {
    if (window !== undefined) {
      window.joint = joint;
    }
    cjmlShapes(joint);
    setCurrGraph(new joint.dia.Graph());
    //if (currGraph == null) {
    //  currGraph = new joint.dia.Graph();
    //}
    //console.log(graph)
    //var displayed_graph = new joint.dia.Graph();
    //if (false) {
    //displayed_graph = graph;
    //}
    if (paper === null) {

      var newPaper = new joint.dia.Paper({
        el: document.getElementById("editor"),
        model: currGraph, // change
        width: document.getElementById("editor-wrapper").offsetWidth - 10,
        height: document.getElementById("editor-wrapper").offsetHeight - 10,
        gridSize: 1,
        interactive: true,
        cellViewNamespace: joint.shapes,
        //defaultLink: new joint.shapes.standard.Link(),
        defaultLink: new joint.shapes.standard.Link({
          attrs: {
              line: {
                strokeWidth: 2,
                strokeDasharray: "10 5"
              }
          }
        }),
      });

      newPaper.setGrid({
        name: 'doubleMesh',
        args: [
          { color: 'red' },
          { color: 'green', thickness: 10, scaleFactor: 8 }
        ]
      }).drawGrid();
      setPaper(newPaper);

    }





    if (paper !== null) {
      if (localStorage.getItem("cjml") !== null) {
        var graph = JSON.parse(localStorage.getItem("cjml"));
        paper.model.fromJSON(graph);
      }
      initGraph(paper.model);
      //paper.on('blank:pointerup', blankPointerUp);
      //paper.on('cell:contextmenu', (elementView, e, x, y) => this.props.elementDoubleClicked(elementView.model, e));
      paper.on('cell:contextmenu', contextClick);
      paper.on('blank:contextmenu', handleBlankContext)
      paper.on('cell:pointerup', embedElement);
      paper.on('cell:pointerdown', unembedElement);
      paper.on('blank:pointerdown', beginMovePaper);
      paper.on('blank:pointermove', movePaper);
      //paper.on('blank:pointerup', endMovePaper);
      paper.on('cell:mousewheel', handleScroll);
      paper.on('blank:mousewheel', handleScrollBlank);
      paper.on('element:mouseenter', onHover);
      paper.on('element:mouseleave', exitHover);
      paper.on('element:pointermove', resizeElement);
      paper.on('element:sizeSelector:pointerdown', beginElementResize);


      paper.on('link:mouseenter', function (linkView) {
        //console.log(`Showtools `,linkView.showTools())
        linkView.showTools();
      });

      paper.on('link:mouseleave', function (linkView) {
        linkView.hideTools();
      });

      //paper.setGrid({ name: 'mesh', args: { color: 'hsla(212, 7%, 75%, 0.5)' } });
      //paper.drawGrid()
      //paper.setGrid('mesh')
      //paper.drawGrid()

    };

  }, [paper, flag]);

  useEffect(() => {
    console.log("saved");
    saveToLocalStorage();
  }, [graph_slice.graph, editor_slice.modCounter, graph_slice.modCounter]);

  /*
  useEffect(() => {
    //updates the graph when the graph slice is updated
    if (paper !== null) {
      console.log("Graph slice updated");
      //fromJSON(JSON.parse(e.target.result):
      paper.model.fromJSON(JSON.parse(graph_slice.graph));
    }
  }, [graph_slice.graph]);

  */


  const saveGraphToFile = (fileName) => {
    const a = document.createElement('a');
    const graphContent = new Blob([JSON.stringify(paper.model.toJSON(), null, 2)], { type: 'text/plain' });
    a.href = URL.createObjectURL(graphContent);
    //a.download = "CORASDiagram.json";
    a.download = fileName + ".json";
    a.click();
    a.remove();


  }

  const loadGraphFromFile = (graph) => {

  }

  //When a link is created we attach tools to it using this function.
  const attachTools = (link) => {
    console.log("Attaching tools");
    //Create tools for link
    var linkView = link.findView(paper);
    // console.log(`AttachTools Linkview `, linkView);

    //combine tools in a view
    var boundaryTool = new joint.linkTools.Boundary();
    var removeButton = new joint.linkTools.Remove();

    var customToolsView = new joint.dia.ToolsView({
      tools: [
        boundaryTool,
        removeButton
      ]
    });

    //add toolview to the linkview that is attached to link
    linkView.addTools(customToolsView);
    linkView.hideTools();
    //hack
    saveToLocalStorage();
  }

  const handleBlankContext = (e) => {
    e.preventDefault();
    //check for editor visible
    if (editor_slice.visible) {
      dispatch(toggleEditor());
    }
  }

  const contextClick = (elementView, e, x, y) => {
    //console.log("Contextx",elementView.model);
    //console.log(editor_slice);
    dispatch(elementSelected({ targetElement: elementView.model, event: e, x: x, y: y }));
  }

  /**
   * Handles the zooming in and out of the paper when the mouse wheel is scrolled.
   * @param {Object} cellView - The cell view object.
   * @param {Object} e - The event object.
   * @param {number} x - The x-coordinate of the mouse pointer.
   * @param {number} y - The y-coordinate of the mouse pointer.
   * @param {number} delta - The amount of delta from the mouse wheel scroll.
   */
  const handleScroll = (cellView, e, x, y, delta) => {
    e.preventDefault();
    const scaleFactor = 1.03;
    const currentScale = paper.scale();

    if (delta > 0) {
      const newX = currentScale.sx * scaleFactor > 5 ? currentScale.sx : currentScale.sx * scaleFactor;
      const newY = currentScale.sy * scaleFactor > 5 ? currentScale.sy : currentScale.sy * scaleFactor;
      paper.scale(newX, newY);
    } else if (delta < 0) {
      const newX = currentScale.sx / scaleFactor < 0.52 ? currentScale.sx : currentScale.sx / scaleFactor;
      const newY = currentScale.sy / scaleFactor < 0.52 ? currentScale.sy : currentScale.sy / scaleFactor;
      paper.scale(newX, newY);
    }
  }

  const handleScrollBlank = (e, x, y, delta) => {
    handleScroll(null, e, x, y, delta);
  }


  
  const saveToLocalStorage = (graph=null) => {
    // might want to update redux state here, or update store more frequently
    //console.log(this.props.currGraph.label)
    if (graph !== null) {
      localStorage.setItem("cjml", JSON.stringify(graph));
    }
    else if (paper !== null) {
      localStorage.setItem("cjml", JSON.stringify(paper.model.toJSON()));
    }
  }

  const getFromLocalStorage = () => {
    if (window.localStorage.getItem("cjml") !== null) {
      loadNewGraph(JSON.parse(localStorage.getItem('cjml')));
    }
  }

  const beginMovePaper = (e, x, y) => {
    console.log('HELLO', x, y);
    //setPaperMove(true);
    //setPaperMoveX(x);
    //setPaperMoveY(y);
    //dispatch(startMovePaper({x: x, y: y}));
    paperMoveX = x;
    paperMoveY = y;
  }
  const movePaper = (e, x, y) => {
    //console.log(moving, px, py)
    /*
    console.log("herE",paperMove, paperMoveX, paperMoveY)
    paper.translate(x, y);
    if (paperMove) {
        console.log("moving")
        const { tx, ty } = paper.translate();
        paper.translate(tx + (x - paperMoveX), ty + (y - paperMoveY));
        //paper.translate(x, y);
    }

    */
    //console.log("SLICE ", editor_slice.paperMoving)
    //console.log("Paper", paper);
    var { tx, ty } = paper.translate();


    paper.translate(tx + (x - paperMoveX), ty + (y - paperMoveY));




    //paper.translate(tx + (x - editor_slice.pointerCoordinates.x), ty + (y - editor_slice.pointerCoordinates.x));
  }
  /*
    const endMovePaper = (e, x, y) => {
      if (editor_slice.paperMoving) {
          dispatch(endMovePaper())
      }
    }
  
    */

    /**
     * This function is called when the mouse hovers over a cell view in the graph.
     * If the cell is a swimlane element, it highlights it and shows its size selector.
     * If the cell is not a swimlane element, it shows its tools.
     * @param {Object} cellView - The view of the cell being hovered over.
     * @param {Object} evt - The event that triggered the hover.
     */
  const onHover = (cellView, evt) => {
    if (cellView.model.attributes.type === "cjml.swimlaneElement") {
      var cell = cellView.model;
      cellView.highlight();
      cell.attr({
        sizeSelector: {
          visibility: "visible"
        }
      })
    } else {
      cellView.showTools()
    }

  }

  /**
   * This function is called when the mouse exits a cell view in the graph.
   * If the cell is a swimlane element, it unhighlights it and hides its size selector.
   * @param {Object} cellView - The view of the cell being exited.
   * @param {Object} evt - The event that triggered the exit.
   */
  const exitHover = (cellView, evt) => {
    if (cellView.model.attributes.type === "cjml.swimlaneElement") {
      var cell = cellView.model;
      cellView.unhighlight();
      cell.attr({
        sizeSelector: {
          visibility: "hidden"
        }
      })
    }
  }

  /**
   * This function is called when the user begins to resize an element in the graph.
   * It sets the interactive option of the cell view to false and sets the increaseElementSize flag to true.
   * @param {Object} cellView - The view of the cell being resized.
   * @param {Object} e - The event that triggered the resizing.
   * @param {number} x - The x-coordinate of the resizing position.
   * @param {number} y - The y-coordinate of the resizing position.
   */
  const beginElementResize = (cellView, e, x, y) => {
    cellView.options.interactive = false;
    increaseElementSize = true
    //dispatch(setCellResizing(true));
  }

  /**
   * This function resizes an element in the graph and performs various actions depending on the type of cell being resized.
   * If the element is being resized, it sets the new width and height and unhighlights it.
   * @param {Object} cellView - The view of the cell being resized.
   * @param {Object} e - The event that triggered the resizing.
   * @param {number} x - The x-coordinate of the resizing position.
   * @param {number} y - The y-coordinate of the resizing position.
   */
  const resizeElement = (cellView, e, x, y) => {
    //console.log(graph_slice.cellResizing)
    console.log(increaseElementSize)
    if (increaseElementSize) {
      var pos = cellView.model.attributes.position;
      var size = cellView.model.attributes.size;
      let newWidth = x - pos.x;

      cellView.model.set({
        size: { width: newWidth, height: size.height }
      });
      //cellView.model.attr({
      //    cornerBox: {d: 'M 0 120 H 120 120 V 120 0'}
      //})

      // To make the highlight follow the actual border
      cellView.unhighlight();
      cellView.highlight();
    }
  }

  /**
    * Embeds an element in the graph and adjusts its position based on its type (swimlane, touchpoint, or link).
    * If the element is a link, it checks if it is valid and removes it if it is not.
    * If the element is a swimlane, it positions it on the grid and adjusts the position of its embedded cells.
  /**
    * This function embeds a cell in the graph and performs various actions depending on the type of cell being embedded.
    *  If the element is a touchpoint, it positions it on the grid and reserves space for the actor icon.
    * If the element is being resized, it sets the new width and height and unhighlights it.
    * If the element is being added to the graph, it checks if there is an element below it and embeds it if there is.
    * @param {Object} cellView - The view of the cell being embedded.
    * @param {Object} evt - The event that triggered the embedding.
    * @param {number} x - The x-coordinate of the embedding position.
    * @param {number} y - The y-coordinate of the embedding position.
  */
  const embedElement = (cellView, evt, x, y) => {
    //console.log("checking embeddddd")

    var cell = cellView.model;
    console.log("CELL ", cell)
    if (cell.attributes.type === 'standard.Link') {
      console.log("CELL source", cell.getSourceElement())
      //removes selftargeting
      if (cell.getTargetElement() === null || cell.getSourceElement().cid === cell.getTargetElement().cid) {
        cell.remove();
        return;
      }
      var source = cell.getSourceElement();
      var target;
      if (cell.getTargetElement()) {
        target = cell.getTargetElement();
      }

      switch (target.attributes.type) {
        case "cjml.commElement":
          if (source.getParentCell() === target.getParentCell()) {
            cell.remove();
          } else {
            //Valid link
            attachTools(cell);
            //change color of initiator
            source.attr({
              body: {
                fill: "#DBEEF4"
              },
              innerBody: {
                fill: "#DBEEF4"
              },
            });
          }
          break;
        default:
          cell.remove();
      }
    } else {
      var pos = cellView.model.attributes.position;
      var swimlaneAxis = 100; //use different grid size for swimlanes and touchpoints
      var swimlineHeight = 150;
      var touchpointHeight = 120;

      var yOffset = 15;
      var xOffset = 110;

      var swimlaneBuffer = 20

      var touchpointAxis = (swimlineHeight - touchpointHeight) / 2;
      //console.log("touchpointaxis",touchpointAxis)
      //console.log("round swim",Math.round(pos.x / swimlaneAxis) * swimlaneAxis)
      //console.log("round touch",Math.round(pos.x / touchpointAxis) * touchpointAxis)

      //check if swimlane
      if (cell.attributes.type === "cjml.swimlaneElement") {
        cell.position(Math.round(pos.x / swimlaneAxis) * swimlaneAxis, Math.round(pos.y / swimlaneAxis) * swimlaneAxis);
        var posDelta = cell.get("position") - graph_slice.startPosition;
        var embedded = cell.getEmbeddedCells();
        //console.log("embeds", embedded);
        //TODO improve hack
        
        for (let i = 0; i < embedded.length; i++) {
          var child = embedded[i];
          //var cellViewsBelow = paper.findViewsFromPoint(child.getBBox().center());
          var childX = Math.round(child.get('position').x / xOffset) * xOffset;
          //if (childX < cell.get('position').x + xOffset) {
          //  cpos.x = cpos.x + xOffset;
          //}
          child.position(childX,cell.get('position').y + yOffset);

        }
      } //else check if touchpoint
      else if (cell.attributes.type === "cjml.commElement" || cell.attributes.type === "cjml.actionElement") {
        //cell.position(Math.round(pos.x / swimlaneAxis) * swimlaneAxis, Math.round(pos.y / (touchpointAxis + 100)) * (touchpointAxis + 100));
        var cellViewsBelow = paper.findViewsFromPoint(cell.getBBox().center());;

        if (cellViewsBelow.length && _.find(cellViewsBelow, function (c) { return c.model.id !== cell.id })) {
          var cellViewBelow = _.find(cellViewsBelow, function (c) { return c.model.id !== cell.id });
          var swimlanePos = cellViewBelow.model.get('position');
          var touchpointPos = { x: (Math.round(pos.x / swimlaneAxis) * swimlaneAxis) + swimlaneBuffer, y: swimlanePos.y + yOffset }
          if (touchpointPos.x < swimlanePos.x + xOffset) {
            touchpointPos.x = touchpointPos.x + xOffset;
          }

          //reserve space to the left for actor icon

          cell.position(touchpointPos.x, touchpointPos.y);
          console.log("pos", touchpointPos)
        }
      }
    }

    //End resize
    if (increaseElementSize) {
      cellView.options.interactive = true;
      increaseElementSize = false;
      cellView.unhighlight();
      return;
    }

    if (graph_slice.preparedElement.element != null && graph_slice.newElement.section === "supplemental") {
      var cellViewsBelow = paper.findViewsFromPoint(cell.getBBox().center());

      console.log(cellViewsBelow);

      if (cellViewsBelow.length) {
        var cellViewBelow = _.find(cellViewsBelow, function (c) { return c.model.id !== cell.id });
        if (cellViewBelow && cellViewBelow.model.get('parent') !== cell.id) {
          //dispatch(decorateElement({ targetElement: cellViewBelow.model}));
        }
      }
    } else {

      var cellViewsBelow = paper.findViewsFromPoint(cell.getBBox().center());

      console.log(cellViewsBelow);

      if (cellViewsBelow.length) {
        var cellViewBelow = _.find(cellViewsBelow, function (c) { return c.model.id !== cell.id });
        if (cellViewBelow && cellViewBelow.model.get('parent') !== cell.id) {
          cellViewBelow.model.embed(cell);
        }
      }
    }
  }



  /**
   * Unembeds a cell from its parent cell in the paper model.
   * If the cell is a link, it returns without doing anything.
   * If the cell has no embeds, it brings it to the front.
   * If the cell has embeds, it starts moving the element.
   * If the cell has a parent, it unembeds the cell from its parent.
   * @param {Object} cellView - The view of the cell to be unembedded.
   */
  const unembedElement = (cellView) => {
    var cell = cellView.model;
    if (!cell.get('embeds') || cell.get('embeds').length === 0) {
      cell.toFront();
    } else {
      dispatch(startMoveElement(cell.get('position')));
    }
    if (cell.get('parent')) {
      paper.model.getCell(cell.get('parent')).unembed(cell);
    }
  }

  //Creates new elements by dropping on paper.
  /**
   * Handles the mouse up event on the paper.
   * If the new element is a supplemental element, it finds the element by coordinates and decorates it.
   * If the new element is not a supplemental element, it adds the element to the graph and embeds it.
   * @param {Object} e - The mouse up event.
   */
  const handlePaperMouseUp = (e) => {
    e.preventDefault();
    const localPoint = paper.pageToLocalPoint(e.pageX, e.pageY);

    if (graph_slice.newElement.section === "supplemental") {
      //find element by coordinates
      var decotarget = paper.model.findModelsFromPoint(localPoint);
      //send first element in return array for now, fix later for swimlane
      if (decotarget.length) {
        var validTarget = decotarget[decotarget.length - 1]
        let targetType = validTarget.get("type");
        if (targetType === "cjml.commElement" || targetType === "cjml.actionElement") {
          dispatch(decorateElement({ targetElement: validTarget }));
        }
      }
    } else {
      var target = paper.model.findModelsFromPoint(localPoint);
      var el = iconInfo[graph_slice.preparedElement.section][graph_slice.preparedElement.id];
      //console.log("EL ",el)
      console.log("element", el)
      if (target.length === 0 && el["type"] !== "swimlane") {
        alert("Touchpoints must be placed in a swimlane.")
      } else {
        var newElement = el["svg"].shapeFn();
        console.log("newElement", newElement)
        dispatch(addElement({ graph: paper.model, x: localPoint.x, y: localPoint.y, element: newElement }));
        //find cell by id
        //var id = graph_slice.preparedElement.uid;
        //console.log("slice", graph_slice.preparedElement);
        //var id = el.get("id");
        //find element by id
        //var element = paper.model.getCell(id);
        //find cellview by element
        var cellView = paper.findViewByModel(newElement);


        console.log("element pre embed",el, "cellviwe", cellView)
        embedElement(cellView);
      }
    }
  };


  const initGraph = (graph) => {
    console.log("INITGRAPH")
    
    /*graph.attributes.cells.models.map((model) => {
      if (model.attributes.type === 'standard.Link') {
        attachTools(model);
      }
    })
    */
    graph.attributes.cells.models.forEach((model) => {
      if (model.attributes.type === 'standard.Link') {
        attachTools(model);
      }
    })
  }
  /**
   * This function loads a new graph and sets it as the current graph. It also creates a new jointjs paper object with the loaded graph and sets it as the current paper object.
   * @param {Object} graph - The graph object to be loaded.
   */
  const loadNewGraph = (graph) => {
    setCurrGraph(graph);
    setPaper(new joint.dia.Paper({
      el: document.getElementById("editor"),
      model: graph,
      width: document.getElementById("editor-wrapper").offsetWidth - 10,
      height: document.getElementById("editor-wrapper").offsetHeight - 10,
      gridSize: 1,
      background: {
        color: 'rgba(255, 255, 255, 1)',
      },
      interactive: true,
      defaultLink: new joint.shapes.standard.Link({
        attrs: {
          line: {
            strokeWidth: 2,
            strokeDasharray: "10 5"
          }
        }
      }),
      cellViewNamespace: joint.shapes,
    }));

    saveToLocalStorage(graph);
  }

  const clearGraph = () => {
    localStorage.removeItem("cjml")
    paper.model.clear();
  }

  const handleOffCanvasShow = () => {
    //dispatch(toggleOffCanvas())
  }

  //<Sidebar graph={currGraph} />
  //{false ? <FileLoader loadGraph={loadNewGraph} attachTools={attachTools}/>: null}
  //<SaveBar saveFile={saveGraphToFile} loadFile={loadNewGraph}/>
  //<OffCanvas />

  return (
    <PageLayout>
      <Container fluid className="editor-page-container">
        <Row className="editor-row">
          <Col lg={2}>
            <Sidebar graph={currGraph} />
            <SaveBar saveFile={saveGraphToFile} loadFile={loadNewGraph} />
            <ClearBar clearGraph={clearGraph}/>
            <SpyderBar loadGraph={loadNewGraph} attachTools={attachTools}/>
          </Col>
          <Col
            className="editor-wrapper"
            id="editor-wrapper"
            onDragEnter={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handlePaperMouseUp}
          >
            <Container fluid className="editor" id="editor"></Container>
          </Col>
          {editor_slice.visible ? <ElementEditor /> : null}
        </Row>
      </Container>
    </PageLayout>
  )
}

export default EditorPage