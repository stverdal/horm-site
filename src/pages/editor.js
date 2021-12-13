import * as React from "react"
import { Container, Row, Col } from "react-bootstrap"
import PageLayout from "../components/layout"
import Sidebar from "../components/sidebar"

import "../styles/global.css"
import "../styles/pages/editor.css"

const EditorPage = () => {
    return (
      <PageLayout>
        <Container fluid className="editor-page-container">
          <Row className="editor-row">
            <Col lg={2}>
              <Sidebar />
            </Col>
            <Col className="editor-wrapper">
              <Container fluid className="editor"></Container>
            </Col>
          </Row>
        </Container>
      </PageLayout>        
    )
}

export default EditorPage