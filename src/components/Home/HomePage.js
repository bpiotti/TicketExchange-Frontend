import React from 'react'

import "./HomePage.css"
import PhotoSlider from '../Slider/PhotoSlider'

const homePage = () => (
    <div className="HomePage">
        <h1>Welcome to the Purdue Ticket Exchange</h1>
        <PhotoSlider />
        <div className="SecondSection">
            <h1>Don't Miss A Beat</h1>
            <h3>Get Started Today - Hit the Link on top right for tickets to your next great experience at Purdue</h3>
            <h4>How does it work?</h4>
            <h5>Are You Looking for Tickets to an Upcoming Event at Purdue, Or, Are You Trying to Sell Tickets to an Event You Can No Longer Make?</h5>
            <h5>Then this is Your One-Stop Shop. Browse the Exchange or Make a Listing Today.</h5>
        </div>
    </div>

);

export default homePage;