import * as React from "react"

import "../../styles/global.css"
import "../../styles/pages/landing.css"

import { Card, Button } from "react-bootstrap"

const GuideItem = () => {
    return (
            <Card style={{ width: '12rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
    )
}

/*
const GuideItem = () => {
    return (
        <div className="guide-item">
            <div className="guide-item-header">
                <h4>Some items of interest</h4>
            </div>
            <ul className="guide-item-list">
                <li className="guide-item-list-item">Link to resource</li>
                <li className="guide-item-list-item">Link to resource</li>
                <li className="guide-item-list-item">Link to resource</li>
            </ul>
        </div>
    )
}
*/

export default GuideItem