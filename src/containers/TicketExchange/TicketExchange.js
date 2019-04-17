import React from 'react';

import Login from '../Login/Login'
import Aux from '../../hoc/Aux/Aux'

class TicketExchange extends React.Component {
    state = {
        auth: false,
        email: null
    }

    componentDidMount() {
        //Check local storage for auth
        if ('auth' in localStorage) {
            this.setState({
                auth: true
            })
        }
    }
    
    render() {
        let content = <h3>TicketExchange</h3>;
        if (this.state.auth === false) {
            content = (
                <Aux>
                    <Login />
                </Aux>
            );
        }
        return (
            <Aux>
                {content}
            </Aux>

        );
    }
}

export default TicketExchange;