import React from 'react';

import companyLogo from '../../Assets/Images/logo.png';
import  './Logo.css';

const logo = (props) => (
    <div className="Logo" style={{height: props.height}}>
        <img src={companyLogo} alt="logo"/>
    </div>
);

export default logo;