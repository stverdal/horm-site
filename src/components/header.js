import * as React from "react"
import { Link } from "gatsby"

import "../styles/global.css"
import "../styles/layout/header.css"
import LogoImage from "../images/HORM.jpg"

const Header = () => {
    return (
        <div className="header-wrapper">
            <nav className="header-links">
                <div className="header-logo">
                    <img
                        src={LogoImage}
                        width="200"
                        alt="HORM"
                    />
                
                </div>
                <ul className="header-links-list">
                    <li className="header-links-list-item"><Link to="/">Home</Link></li>
                    <li className="header-links-list-item"><Link to="/resources">Learn</Link></li>
                    <li className="header-links-list-item"><Link to="/editor">Make</Link></li>
                    <li className="header-links-list-item"><Link to="/information">About</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header