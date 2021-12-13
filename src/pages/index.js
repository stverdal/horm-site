import * as React from "react"
import PageLayout from "../components/layout"
import LandingWrapper from "../components/landing/landing-wrapper"

const LandingPage = () => {
    return (
      <PageLayout>
        <LandingWrapper />
      </PageLayout>        
    )
}

export default LandingPage

/*
        <div className="landing-wrapper">
          <LandingIntro />
          <LandingGuide />
        </div>
*/