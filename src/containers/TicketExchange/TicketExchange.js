import React from 'react';

import Login from '../Login/Login'
import Aux from '../../hoc/Aux/Aux'
import Spinner from '../../components/UI/Spinner'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json';

class TicketExchange extends React.Component {
    state = {
        auth: false,
        email: null,
        loading: false,
        error: false,
        wrongPassword: false
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
                axios.post('http://127.0.0.1:8080/cs252lab6/rest/api/login', payload)
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
                            error: true
                        })

                    })
            }
        });
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        let content = <h3>TicketExchange</h3>;
        if (this.state.auth === false) {
            content = (
                <Aux>
                    <Login
                        wrappedComponentRef={this.saveFormRef}
                        onSubmit={this.handleSubmit} />
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