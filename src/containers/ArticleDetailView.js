import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {Card, Button, Form} from 'antd';
import { useParams } from 'react-router';
import CustomForm from '../components/Form';
import { useNavigate } from "react-router-dom";


const ArticleDetailView = (props) => {
    const [article, setArticle] = useState({})
    const articleID = useParams().articleID
    let navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/${articleID}`)
            .then(resonse => {
                setArticle(resonse.data)
            })
    }, [])

    const handleDelete = (event) => {
        axios.delete(`http://127.0.0.1:8000/api/delete/${articleID}`)
        .then(res => {
            if (res.status === 204) {
                navigate('/')
            }
        })
    }

    return (
        <div>
            <Card title={article.title}>
                <p>{article.content}</p>
            </Card>
            <CustomForm requestType="put" articleID={useParams().articleID} btnText="Update"/>
            <Form onFinish={handleDelete}>
                <Button type="danger" htmlType='submit'>DELETE</Button>
            </Form>
        </div>
    )
}

export default ArticleDetailView
