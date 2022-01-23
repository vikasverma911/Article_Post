import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const CustomForm = (props) => {
    const [form] = Form.useForm();

    const handleFormSubmit = (event, requestType, articleID) => {
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;

        switch ( requestType ) {
            case 'post':
                axios.post('http://127.0.0.1:8000/api/create/', {
                    title: title,
                    content: content
                })
                    .then(res => console.log(res))
                    .catch(error => console.log(error));
            case 'put':
                axios.put(`http://127.0.0.1:8000/api/update/${articleID}/`, {
                    title: title,
                    content: content
                })
                    .then(res => console.log(res))
                    .catch(error => console.log(error));
        }
    }

    return (
        <Form onSubmitCapture={(event) => handleFormSubmit(
            event,
            props.requestType,
            props.articleID
        )}>
            <Form.Item label="Title">
                <Input name="title" placeholder="Enter a Title" />
            </Form.Item>
            <Form.Item label="Content">
                <Input name="content" placeholder="Enter some content..." />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType='submit'>{props.btnText}</Button>
            </Form.Item>
        </Form>
    );
};
export default CustomForm;