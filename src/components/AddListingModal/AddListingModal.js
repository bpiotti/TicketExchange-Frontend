import React from 'react';

// import moment from 'moment';
// import axios from '../../axios-instance';
import { Modal, Input, Form, Select, DatePicker, InputNumber } from 'antd';
import 'antd/lib/modal/style/css';
import 'antd/lib/form/style/css';
import 'antd/lib/input-number/style/css';



class AddListingModal extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const Option = Select.Option;

        const eventOptions = (
            [
                <Option key={0} value="Basketball">Basketball</Option>,
                <Option key={1} value="Football">Football</Option>,
                <Option key={2} value="Concert">Concert</Option>,
                <Option key={3} value="Baseball">Baseball</Option>,
                <Option key={4} value="Other">Other</Option>
            ]
        );
        return (
            <Modal
                title="Create New Listing"
                visible={this.props.show}
                onOk={this.props.onSubmit}
                onCancel={this.props.onCancel}
                okText="Confirm"
                style={{ overflow: "scroll" }}
                width="80%"
                confirmLoading={this.props.confirmLoading}>
                <Form layout="vertical">
                    <Form.Item label="First Name">
                        {getFieldDecorator('sellerfirst', {
                            rules: [{ required: true, message: 'First Name is Required' }],
                        })(
                            <Input type="textarea" style={{ width: "50%" }} />
                        )}
                    </Form.Item>
                    <Form.Item label="Last Name">
                        {getFieldDecorator('sellerlast', {
                            rules: [{ required: true, message: 'Last Name is Required' }],
                        })(
                            <Input type="textarea" style={{ width: "50%" }} />
                        )}
                    </Form.Item>
                    <Form.Item label="Price">
                        {getFieldDecorator('price', {
                            rules: [{ required: true, message: 'Price is Required: Must be a Number' }],
                        })(
                            <InputNumber min={0}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                style={{ width: "20%" }} />
                        )}
                    </Form.Item>
                    <Form.Item label="Event">
                        {getFieldDecorator('event', {
                            rules: [{ required: true, message: 'Event is Required'}],
                        })(
                            <Select
                                style={{ width: '50%' }}>
                                {eventOptions}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item label="Phone Number">
                        {getFieldDecorator('phone', {
                            rules: [{ required: true, message: 'Phone Number is Required'}],
                        })(
                            <Input type="textarea" style={{ width: "50%" }} />
                        )}
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

}

export default Form.create()(AddListingModal);