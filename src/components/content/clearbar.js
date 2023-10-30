import React from 'react';
import { Button } from "react-bootstrap"

import "../../styles/content/savebar.css"

const ClearBar = ({clearGraph}) => {
    const handleClick = () => {
        clearGraph();
    }

    return (
        <div className='button-wrapper'>
            <Button variant="outline-primary" onClick={handleClick}>Clear Graph</Button>
        </div>
    );
}

export default ClearBar;
