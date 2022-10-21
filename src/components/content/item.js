import * as React from "react"

import "../../styles/global.css"
import "../../styles/content/item.css"
import { Link } from "gatsby"

const ContentItem = ({ title, contentName, image }) => {
    return (
        <div className="content-item-wrapper">
            <a href={'/horm/' + contentName + '.pptx'} download className="content-thumbnail">
                <img
                    src={"/horm/" + image}
                    alt={contentName + "_image"}
                />
            </a>
            <p>{title || "placeholder title"}</p>
            <div className="content">
                <div className="content-download">
                    <a href={'/horm/' + contentName + '.pptx'} download> Download</a>
                </div>
            </div>
        </div>
    )
}

export default ContentItem


/*
                <div className="content-view">
                    <Link to="/presenter" state={{ content: contentName }}>View in browser</Link>
                </div>
*/