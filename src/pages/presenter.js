import React, { useState,  } from "react";
import PageLayout from "../components/layout"

import ContentSection from "../components/content/section.js"

import "../styles/pages/presenter.css"
//import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
//import { Document, Page } from 'react-pdf';
//import 'react-pdf/dist/esm/Page/AnnotationLayer.js';
//import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

import { Button } from "react-bootstrap"

//import "../styles/pages/resources.css"

const PresenterPage = ({ location }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages)
        setPageNumber(1);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1)
    }

    return (
      <PageLayout>
          <div className="presenter-wrapper">
                <div className="document-holder">

                </div>
            </div>
      </PageLayout>        
    )
}

export default PresenterPage

/*
                    <Document
                        //file="https://arxiv.org/pdf/2001.10503.pdf"
                        file={'/' + location.state.content + '.pdf'}
                        onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} renderAnnotationLayer={false}/>
                    </Document>
                </div>
                <div>
                    <p>
                        Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                    </p>
                    <Button
                        variant="flat"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                    >
                        《
                    </Button>
                    <Button
                        variant="flat"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                    >
                        》
                    </Button>
*/