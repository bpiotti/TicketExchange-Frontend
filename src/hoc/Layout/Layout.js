import React from 'react'

import Aux from '../Aux/Aux'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar.js'
import './Layout.css'

class Layout extends React.Component {
    render() {
        return (
            <Aux>
                <Toolbar />
                <main className="Content">
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

export default Layout