import React, { useEffect, useRef, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import * as joint from "jointjs"
import { useSelector, useDispatch } from "react-redux"
import { Provider } from "react-redux"
import { addElement, removeElement, decorateElement} from "../features/graph/graphSlice"
import { toggleOffCanvas} from "../features/cjml/cjmlSlice"
import editorSlice, { elementSelected, toggleEditor, startMovePaper, endMovePaper } from "../features/editor/editorSlice"
import _ from 'lodash';
import Button from 'react-bootstrap/Button';

import PageLayout from "../components/layout"
import Sidebar from "../components/sidebar"
import FileLoader from "../components/fileloader"
import iconInfo from "../components/content/iconinfo"
import ElementEditor from "../components/elementeditor"
import OffCanvas from "../components/offCanvas"
import SaveBar from "../components/content/saveBar"


//import Editor from "../components/editor/editor"

import "../styles/global.css"
import "../styles/pages/editor.css"
import cjmlShapes from "../components/content/cjmlshapes"
import { StaticQueryDocument } from "gatsby"


const EditorPage = () => {

  const [currGraph, setCurrGraph] = useState(null);
  //const currGraph = new joint.dia.Graph();
  //const [paper, setPaper] = useState(null);
  const [flag, setFlag] = useState(false);
  const [paper, setPaper] = useState(null);

  var paperMoveX = 0;
  var paperMoveY = 0;

  const dispatch = useDispatch();
  const graph_slice = useSelector((state) => state.graph);
  const editor_slice = useSelector((state) => state.editor);

  const blankPointerUp = (e) => {
    console.log("UPPPP")
  };



  useEffect(() => {
    //console.log("SDF{FDSASJDLKDJLSAKDLASKDFEJSALKDJLWKJDLASKJDLSKJDLSAKDJEJDIEJOQIJEJSLDKJ")
    //onsole.log(paper)
  }, [paper])
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
        background: {
          color: 'rgba(255, 255, 255, 1)',
        },
        interactive: true,
        cellViewNamespace: joint.shapes,
        defaultLink: new joint.shapes.standard.Link()
      });

      /*;
      newPaper.on('cell:contextmenu', contextClick);
      newPaper.on('blank:contextmenu', handleBlankContext)
      newPaper.on('cell:pointerup', embedElement);
      newPaper.on('cell:pointerdown', unembedElement);
      newPaper.on('blank:pointerdown', beginMovePaper);
      newPaper.on('blank:pointermove', movePaper);
      newPaper.on('blank:pointerup', endMovePaper);
      newPaper.on('cell:mousewheel', handleScroll);
      newPaper.on('blank:mousewheel', handleScrollBlank);
      */


      setPaper(newPaper);
      //paper = newPaper;
    }
      /*
      setPaper(new joint.dia.Paper({
        el: document.getElementById("editor"),
        model: currGraph, // change
        width: document.getElementById("editor-wrapper").offsetWidth - 10,
        height: document.getElementById("editor-wrapper").offsetHeight - 10,
        gridSize: 1,
        background: {
          color: 'rgba(255, 255, 255, 1)',
        },
        interactive: true,
        cellViewNamespace: joint.shapes,
      }))
    }
    */
    //Add listeners to window
    //window.addEventListener('resize', this.updatePaperSize);
    //window.addEventListener("mousedown", this.toggleInfo);
    //window.addEventListener("pointermove", this.moveItem);
    //Add listeners to paper
    //paper.on('cell:contextmenu', (elementView, e, x, y) => this.props.elementDoubleClicked(elementView.model, e));
    //paper.on('cell:pointerdblclick', (elementView, e, x, y) => this.props.elementDoubleClicked(elementView.model, e));
    //paper.on('element:pointerdblclick', (elementView, e, x, y) => this.props.elementDoubleClicked(elementView.model, e));
    //paper.on('element:pointermove', this.resizeElement);
    //paper.on('element:mouseenter', this.onHover);
    //paper.on('element:mouseleave', this.exitHover);

    //paper.on('link:mouseenter', function(linkView) {
    //    //console.log(`Showtools `,linkView.showTools())
    //    linkView.showTools();
    //});

    //paper.on('link:mouseleave', function(linkView) {
    //    linkView.hideTools();
    //});

    //paper.on('cell:mousewheel', this.handleScroll);
    //paper.on('blank:mousewheel', this.handleScrollBlank);

    //paper.on('blank:pointerdown', this.beginMovePaper);
    //paper.on('blank:pointermove', this.movePaper);




    
    if (paper !== null) {
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

      paper.on('link:mouseenter', function(linkView) {
        //console.log(`Showtools `,linkView.showTools())
        console.log("SHOWINF TOOLS");
        linkView.showTools();
      });

      paper.on('link:mouseleave', function(linkView) {
        linkView.hideTools();
      });
    };


    //paper.on('element:sizeSelector:pointerdown', this.beginElementResize);

    //setCurrGraph(displayed_graph)
    //console.log("graph", displayed_graph)

  },[paper, flag]);

  /*
  useEffect(() => {
    console.log("currgraph", currGraph)
    var swimlane = new joint.shapes.standard.Rectangle();
    swimlane.position(25, 25);
    swimlane.resize(800, 90);
    //swimlane.addTo(currGraph);
    swimlane.attr({
      body: {
        fill: '#F2F2F2',
        rx: 5,
        ry: 5,
        strokeWidth: 2,
        stroke: '#D9D9D9'
      }
    })
  }, [])*/


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
    dispatch(elementSelected({ targetElement: elementView.model, event: e, x: x, y: y}));
  }
  
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

  const saveToLocalStorage = () => {
    console.log("saving")
    // might want to update redux state here, or update store more frequently
    //console.log(this.props.currGraph.label)
    window.localStorage.setItem("cjml", JSON.stringify(paper.model.toJSON()));
    //console.log(this.props.currGraph.label);
    //window.localStorage.setItem('currTab', this.props.currGraph.label);
  }

  const getFromLocalStorage = () => {
    if (window.localStorage.getItem("cjml") !== null) {
      paper.model.fromJSON(JSON.parse(window.localStorage.getItem('cjml')));
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


  /*
    beginMovePaper(e, x, y) {
        console.log('HELLO');
        this.setState({ paperMove: { moving: true, x, y } });
    }
    
    movePaper(e, x, y) {
        if (this.state.paperMove.moving) {
            const { tx, ty } = this.paper.translate();
            this.paper.translate(tx + (x - this.state.paperMove.x), ty + (y - this.state.paperMove.y));
        }
    }

    endMovePaper(e, x, y) {
        if (this.state.paperMove.moving) {
            this.setState({ paperMove: { moving: false } })
        }
    }

  */

  const embedElement = (cellView, evt, x, y) => {
    //console.log("checking embeddddd")
    var cell = cellView.model;
    console.log("CELL ",cell)
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

      //Remove magnet from action and swimlane. Create new element for action.
      switch (target.attributes.type) {
        case "cjml.commElement":
          if (source.getParentCell() === target.getParentCell()) {
            cell.remove();
          } else {
            //Valid link
            attachTools(cell);
          }
          break;
        default:
          cell.remove();
      }
    }


    console.log("slice", graph_slice)
    if (graph_slice.preparedElement.element != null && graph_slice.newElement.section == "supplemental") {
      console.log("SUPPLEMENTAL")
      var cellViewsBelow = paper.findViewsFromPoint(cell.getBBox().center());

      console.log(cellViewsBelow);

      if (cellViewsBelow.length) {
          var cellViewBelow = _.find(cellViewsBelow, function (c) { return c.model.id !== cell.id });
          if (cellViewBelow && cellViewBelow.model.get('parent') !== cell.id) {
            console.log("TRARGETRAREF", cellViewBelow.model)
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

  const unembedElement = (cellView) => {
    var cell = cellView.model;
    //if link return, no need to prepare for embedding
    //if (cell.attributes.type === 'coras.defaultLink') {
    //    return;
    //}
    
    //console.log('unembedElement')

    //if link exit
    //this.setState({ elementPosition: cell.attributes.position });

    if (!cell.get('embeds') || cell.get('embeds').length === 0) {
        cell.toFront();
    }

    if (cell.get('parent')) {
        console.log(paper.model)
        paper.model.getCell(cell.get('parent')).unembed(cell);
    }
}

  //Creates new elements by dropping on paper.
  const handlePaperMouseUp = (e) => {
    e.preventDefault();
    //console.log("EVENT", e);
    //const localPoint = paper.pageToLocalPoint(e.pageX, e.pageY);
    //console.log("E", e)
    //Check if new element or decorating existing element
    //if (graph_slice.newElement.section == "supplemental") {
    //  var target = e.target;
      //var parent = target.parentElement;
    //  console.log("Target", target)
    //  while (target.getAttribute("data-type") == null) {
    //    target = target.parentElement;
    //    console.log("Target", target)
    //  }
    //  if (target.getAttribute("data-type") === "cjml.commElement") {
     //   console.log("IN HERE",target.getAttribute("data-type"));
    //    console.log("target",target)
     //   target.attr("body/fill", "#fe988d");
        //dispatch(decorateElement({ targetElement: target }));
    //  }
    const localPoint = paper.pageToLocalPoint(e.pageX, e.pageY);

    if (graph_slice.newElement.section === "supplemental") {
      //find element by coordinates
      var decotarget = paper.model.findModelsFromPoint(localPoint);
      //send first element in return array for now, fix later for swimlane
      if (decotarget.length) {
        var validTarget = decotarget[decotarget.length - 1]
        let targetType = validTarget.get("type");
        if (targetType === "cjml.commElement" || targetType === "cjml.actionElement") {
          dispatch(decorateElement({ targetElement: validTarget}));
        }
      }
    } else {
      var target = paper.model.findModelsFromPoint(localPoint);
      if (target.length == 0 && graph_slice.preparedElement.element.get("type") !== "cjml.swimlaneElement") {
        alert("Touchpoints must be placed in a swimlane.")
      } else {
        dispatch(addElement({ graph: paper.model, x: localPoint.x, y: localPoint.y }));
        console.log("CHECKING STATE", graph_slice.preparedElement.element)
        var cellView = paper.findViewByModel(graph_slice.preparedElement.element);
        embedElement(cellView);
      }
    }

    //console.log("CHECKING STATE", graph_slice.preparedElement.element)
    //var cellView = paper.findViewByModel(graph_slice.preparedElement.element);
    //embedElement(cellView);
    
    //saveToLocalStorage();

    //this.props.elementDropped(this.paper.model, localPoint.x, localPoint.y);
    //var cellView = paper.findViewByModel(this.props.newElement);
    //console.log(cellView);
    //this.embedElement(cellView);
  };

  const initGraph = (graph) => {
    console.log("INITGRPAH")
    graph.attributes.cells.models.map((model) => {
        if (model.attributes.type === 'standard.Link') {
            attachTools(model);
        }
    })
  }

  const loadNewGraph = (graph) => {
    setCurrGraph(graph); //does nothing?t
    setPaper(new joint.dia.Paper({
      el: document.getElementById("editor"),
      model: graph, // change
      width: document.getElementById("editor-wrapper").offsetWidth - 10,
      height: document.getElementById("editor-wrapper").offsetHeight - 10,
      gridSize: 1,
      background: {
        color: 'rgba(255, 255, 255, 1)',
      },
      interactive: true,
      defaultLink: new joint.shapes.standard.Link(),
      cellViewNamespace: joint.shapes,
    }));
  }

  const handleOffCanvasShow = () => {
    dispatch(toggleOffCanvas())
  }

  return (
    <PageLayout>
      <Container fluid className="editor-page-container">
        <Row className="editor-row">
          <Col lg={2}>
            <Sidebar graph={currGraph} />
            {false ? <FileLoader loadGraph={loadNewGraph} attachTools={attachTools}/>: null}
            <SaveBar saveFile={saveGraphToFile} loadFile={loadNewGraph}/>
            <OffCanvas />
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


/*

    var swimlane = new joint.shapes.standard.Rectangle();
    swimlane.position(25, 25);
    swimlane.resize(800, 90);
    swimlane.addTo(displayed_graph);
    swimlane.attr({
      body: {
        fill: '#F2F2F2',
        rx: 5,
        ry: 5,
        strokeWidth: 2,
        stroke: '#D9D9D9'
      }
    })

    var swimlane2 = swimlane.clone()
    swimlane2.position(25, 125)
    swimlane2.addTo(displayed_graph)

    var touchpoint = new joint.shapes.standard.Rectangle();
    touchpoint.position(100, 30)
    touchpoint.resize(150, 80);
    touchpoint.attr({
      body: {
        fill: '#DBEEF4',
        rx: 5,
        ry: 5,
        strokeWidth: 2,
        stroke: '#31859C'
      },
      label: {
        text: 'Meets for an \nappointment \nwith GP'
      }
    })
    touchpoint.addTo(displayed_graph)
    swimlane.embed(touchpoint)

    var touchpoint2 = touchpoint.clone();
    touchpoint2.position(100, 130)
    touchpoint2.attr({
      body: {
        fill: '#FFFFFF',
        rx: 5,
        ry: 5,
        strokeWidth: 2,
        stroke: '#31859C'
      },
      label: {
        text: 'Medical \nexamination =>\nneed to consult\na specialist ',
      }
    })

    touchpoint2.addTo(displayed_graph)

    var touchpoint3 = touchpoint.clone();
    touchpoint3.position(260, 130);
    touchpoint3.attr({
      label: {
        text: 'Sending an\nelectronic\nreferral to the\nspecialist',
      }
    })
    touchpoint3.addTo(displayed_graph)

    swimlane2.embed(touchpoint2)
    swimlane2.embed(touchpoint3)
    var circle = new joint.shapes.standard.Circle();
    circle.position(300, 300);
    circle.resize(50, 50)
    circle.attr({
      body: {
        fill: '#FFFFFF',
        rx: 5,
        ry: 5,
        strokeWidth: 3,
        stroke: '#31859C'
      }
    })

    circle.addTo(displayed_graph)

    var circle2 = circle.clone();
    circle2.position(400, 400);
    circle2.attr({
      body: {
        stroke: '#B7DEE8'
      }
    })
    circle2.addTo(displayed_graph)
    var link = new joint.shapes.standard.Link();
    link.source(touchpoint);
    link.target(touchpoint2);
    link.attr('line/stroke', '#7F7F7F');
    link.addTo(displayed_graph);

    var link2 = new joint.shapes.standard.Link();
    link2.source(circle);
    link2.target(circle2);
    link2.attr('line/stroke', '#7F7F7F');
    link2.addTo(displayed_graph);

*/