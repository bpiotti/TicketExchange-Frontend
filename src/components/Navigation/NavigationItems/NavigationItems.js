import React from 'react';

import  './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem'

const naviagationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem link="/ticket-exchange">Exchange</NavigationItem>
        <NavigationItem link="/">Home</NavigationItem>
    </ul>
);

export default naviagationItems;