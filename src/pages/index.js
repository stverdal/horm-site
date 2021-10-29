import * as React from "react"
import PageLayout from "../components/layout"

import LandingIntro from "../components/landing/landing"
import LandingGuide from "../components/landing/guide"

const LandingPage = () => {
    return (
      <PageLayout>
        <div className="landing-wrapper">
          <LandingIntro />
          <LandingGuide />
        </div>
      </PageLayout>        
    )
}

export default LandingPage