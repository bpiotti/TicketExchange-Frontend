import React from 'react'

import { Table, Select } from 'antd';
import Aux from '../../hoc/Aux/Aux'
import axios from '../../axios-instance'
import 'antd/lib/table/style/css';
import './TicketTable.css'

const Option = Select.Option;

class TicketTable extends React.Component {
    state = {
        dataSource: [],
    }

    handleChange = (value) => {
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

    componentDidMount() {
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

    render() {
        const columns = [
            { title: 'Event', dataIndex: 'event' },
            { title: 'Date', dataIndex: 'date' },
            { title: 'Seller Name', dataIndex: 'sellername' },
            { title: 'Price', dataIndex: 'price' },
            // {
            //     title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:;">Delete</a>,
            // },
        ];

        let content = (
            <div>
                <div className="table-operations">
                    <Select placeholder="Sort:" style={{ width: 120 }} onChange={this.handleChange}>
                        <Option value="Basketball">Basketball</Option>
                        <Option value="Football">Football</Option>
                        <Option value="Concert">Concert</Option>
                        <Option value="Baseball">Baseball</Option>
                        <Option value="Other">Other</Option>
                    </Select>
                </div>
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