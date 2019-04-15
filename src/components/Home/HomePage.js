import React from 'react'

import "./HomePage.css"
import PhotoSlider from '../Slider/PhotoSlider'

const homePage = () => (
    <div className="HomePage">
        <h1>Welcome to the Ticket Exchange</h1>
        <PhotoSlider />
        <div style={{height: '500px', width: '100%', backgroundColor: '#CFD8DC'}}>

        </div>
    </div>

);

export default homePage;