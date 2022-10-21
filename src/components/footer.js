import * as React from "react"

import "../styles/layout/footer.css"

const Footer = () => {
    return (
        <div className="footer-wrapper bg-light">
            <div className="wip-tag">
                <h4>Site is under active construction</h4>
            </div>
            <div className="footer-content"><i>Human Organizational Risk Models</i></div>
            <div className="footer-logo">
                <img
                    src={"/horm/cc.PNG"}
                    width="100"
                    alt="HORM"
                />
            </div> 
        </div>
    )
}

export default Footer