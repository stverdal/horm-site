import * as React from "react"
import { Link } from "gatsby"

import "../../styles/global.css"
import "../../styles/content/category.css"

import categoryinfo from './categoryinfo'

const CategorySection = ({type, category}) => {
    return (
        <div className="category-wrapper">
            <div className="category-header">
                <h3 className="fw-light">{categoryinfo[type][category]["title"]}</h3>
            </div>
            <div className="category-content">
                <div className="category-description">
                    <p>{categoryinfo[type][category]["description"]}</p>
                </div>
                <a href={categoryinfo[type][category]["link"]} className="category-image">
                    <img
                        src={"/horm/" + categoryinfo[type][category]["image"]}
                        alt="image"
                    />
                </a>
            </div>
        </div>
    )
}

export default CategorySection