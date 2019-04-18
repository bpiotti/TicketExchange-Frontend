import React from 'react';

import Login from '../Login/Login'
import Aux from '../../hoc/Aux/Aux'
import Spinner from '../../components/UI/Spinner'
import axios from '../../axios-instance'
import "./TicketExchange.css"
import { Button } from 'antd'
import TicketTable from '../TicketTable/TicketTable'

axios.defaults.headers.post['Content-Type'] = 'application/json';

class TicketExchange extends React.Component {
    state = {
        auth: false,
        email: null,
        loading: false,
        error: false,
        wrongPassword: false,
        myTickets: false
    }

    componentDidMount() {
        //Check local storage for auth
        if ('auth' in localStorage) {
            this.setState({
                auth: true,
                email: localStorage.getItem("email")
            })
        }
    }

    logoutHandler = () => {
        localStorage.removeItem('auth')
        localStorage.removeItem('email')
        this.setState({
            auth: false,
            email: null
        })
    }

    myTicketsHandler = () => {
        this.setState({
            myTickets: true
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const payload = {
                    email: values.email,
                    password: values.password
                }
                this.setState({
                    loading: true
                })
                axios.post('/login', payload)
                    .then(response => {
                        console.log('got response from server')
                        console.log(response)
                        if (response.data.password === "false") {
                            //wrong password
                            this.setState({
                                loading: false,
                                error: false,
                                wrongPassword: true
                            })
                        }
                        else {
                            localStorage.setItem("auth", "true")
                            localStorage.setItem("email", payload.email)
                            this.setState({
                                loading: false,
                                auth: true,
                                email: payload.email,
                                error: false,
                                wrongPassword: false
                            })
                        }

                    })
                    .catch(err => {
                        console.log('error in login post:', err)
                        this.setState({
                            error: true,
                            wrongPassword: false,
                            loading: false
                        })

                    })
            }
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        let content = (
            <Aux >
                <div className="Top">
                    <Button type="primary" size="large" onClick={this.myTicketsHandler}>My Listings</Button>
                    <Button type="danger" size="large" onClick={this.logoutHandler}>Logout</Button>

                </div>
                <div className="Main">
                    <h1>Welcome {this.state.email}</h1>
                    <TicketTable myTickets={this.state.myTickets}/>
                </div>
            </Aux>

        );

        if (this.state.auth === false) {
            content = (
                <Aux>
                    {this.state.wrongPassword ? <h5 style={{ color: "red" }}>Email-Password Combination doesn't Match!</h5> : null}
                    {this.state.error ? <h5 style={{ color: "red" }}>Network Error. Check your Network and Try Again</h5> : null}
                    <Login
                        wrappedComponentRef={this.saveFormRef}
                        onSubmit={this.handleSubmit} />
                </Aux>
            );
        }
        if (this.state.loading) {
            content = <Spinner />
        }
        return (
            <Aux>
                {content}
            </Aux>

        );
    }
}

export default TicketExchange;