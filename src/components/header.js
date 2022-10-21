import * as React from "react"
import { Link } from "gatsby"

import "../styles/global.css"
import "../styles/layout/header.css"
import LogoImage from "../images/HORM_logo_long.jpg"

const Header = () => {
    return (
        <div className="header-wrapper">
            <div className="header-content">
                <div className="header-logo">
                    <img
                        src={LogoImage}
                        width="300"
                        alt="HORM"
                    />
                </div>
                <div className="header-title">
                    <h1>The human element in cybersecurity</h1>
                </div>
            </div>
            <div className="header-links_">
                <ul className="header-links-list">
                    <li className="header-links-list-item"><Link to="/">Home</Link></li>
                    <li className="header-links-list-item"><Link to="/resources">Learn</Link></li>
                    <li className="header-links-list-item"><Link to="/create">Create</Link></li>
                    <li className="header-links-list-item"><Link to="/information">About</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header


/*
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
                    <li className="header-links-list-item"><Link to="/create">Create</Link></li>
                    <li className="header-links-list-item"><Link to="/information">About</Link></li>
                </ul>
            </nav>
        </div>
*/