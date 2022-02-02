import React, {useEffect, useState} from 'react'
import Articles from '../components/Article'
import axios from 'axios'  
import CustomForm from '../components/Form'

const ArticleListView = () => {
     
    const [article, setArticle] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/')
            .then(resonse => {
                setArticle(resonse.data)
            })
    }, [])

    return (
        <div>
            <Articles data={article} />
            <br></br>
            <h2>Create an article</h2>
            <CustomForm requestType="post" articleID={null} btnText="Post"/>
        </div>
    )
}

export default ArticleListView
