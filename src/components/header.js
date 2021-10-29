import * as React from "react"
import { Link } from "gatsby"

import "../styles/global.css"
import "../styles/layout/header.css"

const Header = () => {
    return (
        <div className="header-wrapper">
            <nav className="header-links">
                <div className="header-logo"><Link to="/">LOGO</Link></div>
                <ul className="header-links-list">
                    <li className="header-links-list-item"><Link to="/">HORM</Link></li>
                    <li className="header-links-list-item"><Link to="/resources">Resources</Link></li>
                    <li className="header-links-list-item"><Link to="/editor">Editor</Link></li>
                    <li className="header-links-list-item"><Link to="/information">Information</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header