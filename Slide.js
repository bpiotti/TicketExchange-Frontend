import React from 'react';

import './Slide.css'

const slide = props => {
    const styles = {
        backgroundImage: `url(${props.image})`,
        backgroundSize: 'cover',
        // backgroundRepeat: 'no-repeat',
        // backgroundPosition: '50% 60%'
    }
    return (
        <div className="Slide" style={styles}>

        </div>
    );
}


export default slide;