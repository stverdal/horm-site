import * as React from "react"
import PageLayout from "../components/layout"

import "../styles/global.css"
import "../styles/pages/information.css"

const InformationPage = () => {
    return (
      <PageLayout>
        <div className="information-wrapper">
            <div className="information-title">
                <h2>Information</h2>
            </div>
            <div className="information-block">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse condimentum elementum aliquet. Nunc luctus laoreet urna, a condimentum elit dictum suscipit. Suspendisse ac quam arcu. Aliquam eget semper orci, et gravida leo. Quisque convallis at nisi a fermentum. Ut congue scelerisque lorem sed efficitur. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi dictum eleifend risus, quis tempor odio tristique nec. Sed suscipit elit maximus nisl dictum blandit. Vivamus sagittis quis felis non tristique.</p>
            </div>
            <div className="information-block">
                <p>Donec nec felis pharetra lorem convallis rutrum vitae at sem. Donec ut imperdiet mauris. Etiam et auctor augue. Vestibulum fringilla in lectus a laoreet. Donec fringilla, mi sed consectetur maximus, quam sapien cursus nisi, a blandit tortor quam et est. Suspendisse aliquet justo nec turpis condimentum molestie. Aenean sed neque turpis. Maecenas justo leo, facilisis vel tortor ut, fringilla faucibus libero. Vivamus mollis sagittis mauris, sit amet vulputate leo vehicula a. Vestibulum vestibulum urna sed malesuada ullamcorper.</p>
            </div>
            <div className="information-block">
                <p>Fusce faucibus tortor sit amet ligula mattis scelerisque. Morbi finibus leo at imperdiet pellentesque. Quisque elit augue, aliquet ac laoreet ut, pulvinar eu mi. Sed purus nisi, finibus id nisi fermentum, auctor pulvinar nunc. Aenean sit amet dolor quis mauris ornare cursus sed at dui. Pellentesque auctor nisl odio, eget interdum nisl accumsan sed. Aliquam eget neque elementum, porta ipsum scelerisque, rutrum diam. Nunc in ligula sit amet nisi rhoncus posuere. Duis tempor nec ipsum et ullamcorper. Curabitur pulvinar ante varius magna imperdiet malesuada eget sed dui.</p>
            </div>
        </div>
      </PageLayout>        
    )
}

export default InformationPage