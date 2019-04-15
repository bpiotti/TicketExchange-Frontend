import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'

const app = (
    <BrowserRouter base="/">
        <App />
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));
serviceWorker.unregister();
