import React from 'react';

import ticket from '../../Assets/Images/ticket.png';
import  './Logo.css';

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={ticket} alt="logo" />
    </div>
);

export default logo;