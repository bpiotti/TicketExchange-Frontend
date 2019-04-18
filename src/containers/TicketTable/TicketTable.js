import React from 'react'

import { Table, Select, Button } from 'antd';
import Aux from '../../hoc/Aux/Aux'
import axios from '../../axios-instance'
import 'antd/lib/table/style/css';
import './TicketTable.css'
import AddListingModal from '../../components/AddListingModal/AddListingModal'
import moment from 'moment'

const Option = Select.Option;

class TicketTable extends React.Component {
    state = {
        dataSource: [],
        showModal: false,
        modalLoadButton: false,
        addTicketError: false
    }

    showModal = () => {
        this.setState({
            showModal: true,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            //Format the current time
            const gametime = values.gametime.format('YYYY-MM-DD HH:mm')
            values.gametime = gametime

            //get current data
            const payload = {
                ...values,
                sold: false,
                email: this.props.email,
                date: moment().format('YYYY-MM-DD HH:mm'),
            }
            this.setState({ modalLoadButton: true });
            //Add resource to server
            axios.post('/addTicket', payload)
                .then(response => {
                    console.log('response from server: ', response)
                    this.fetchAllData()
                    this.setState({ modalLoadButton: false, showModal: false, addTicketError: false });
                })
                .catch(err => {
                    console.log('error in login post:', err)
                    this.setState({ showModal: true, addTicketError: true, modalLoadButton: false });
                })
                
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            showModal: false,
        });
    }

    handleSortChange = (value) => {
        console.log(`selected ${value}`);
        const url = '/getAllTicketsSort?sort=' + value
        axios.get(url)
            .then(response => {
                console.log(response)
                const tempData = []
                for (let key in response.data) {
                    tempData.push({
                        ...response.data[key],
                        price: '$' + response.data[key].price,
                        key: response.data[key].ticketid,
                        sellername: response.data[key].sellerlast + ', ' + response.data[key].sellerfirst
                    })
                }
                this.setState({
                    dataSource: tempData
                })
            })
            .catch(err => {
                console.log('error in ' + url + ': ', err)
            })
    }

    fetchAllData = () => {
        axios.get('/getAllTickets')
            .then(response => {
                console.log(response)
                const tempData = []
                for (let key in response.data) {
                    tempData.push({
                        ...response.data[key],
                        price: '$' + response.data[key].price,
                        key: response.data[key].ticketid,
                        sellername: response.data[key].sellerlast + ', ' + response.data[key].sellerfirst
                    })
                }
                this.setState({
                    dataSource: tempData
                })

            })
            .catch(err => {
                console.log('error in getAllTickets: ', err)
            })
    }

    componentDidMount() {
        this.fetchAllData()
    }

    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    render() {
        const columns = [
            { title: 'Event', dataIndex: 'event' },
            { title: 'Date Listed', dataIndex: 'date' },
            { title: 'Seller Name', dataIndex: 'sellername' },
            { title: 'Price', dataIndex: 'price' },
            { title: 'Game time', dataIndex: 'gametime' }
        ];

        let content = (
            <div>
                <div className="table-operations">
                    <Select placeholder="Sort by:" style={{ width: 120 }} onChange={this.handleSortChange}>
                        <Option value="Basketball">Basketball</Option>
                        <Option value="Football">Football</Option>
                        <Option value="Concert">Concert</Option>
                        <Option value="Baseball">Baseball</Option>
                        <Option value="Other">Other</Option>
                    </Select>
                    <Button onClick={this.fetchAllData}>Clear Sort</Button>
                    <Button type="primary" onClick={this.showModal}>Create Listing</Button>
                </div>
                {this.state.showModal ?
                    <AddListingModal
                        wrappedComponentRef={this.saveFormRef}
                        onSubmit={this.handleSubmit}
                        show={this.state.showModal}
                        onCancel={this.handleCancel}
                        modalLoadButton={this.state.modalLoadButton}
                        addTicketError={this.state.addTicketError} />
                    : null}
                <Table
                    columns={columns}
                    expandedRowRender={record => <p style={{ margin: 0 }}>
                        {'EMAIL: ' + record.email + ', PHONE: ' + record.phone + ' ----- ' + record.description}</p>}
                    bordered
                    dataSource={this.state.dataSource}
                />
            </div>
        )
        if (this.props.myTickets) {
            content = <h3>MYTICKETS</h3>
        }
        return (
            <Aux>
                {content}
            </Aux>
        );
    }
}

export default TicketTable;