import React, {useState,useEffect} from "react"
import axios from 'axios'

export default ({postId}) =>{
    const [comments, setComments] = useState([])

    const fetchData = async() => {
        const res = await axios.get(`http://localhost:4002/posts/${postId}/comments`)
        setComments(res.data)
    }

    useEffect(()=>{
        fetchData()
    }, [])
    console.log(postId, ": ",comments)
    const renderedComments = comments.map((comment)=>{
        return <li key={comment.id}>{comment.content}</li>
    })
    return <ul>
        {renderedComments}
    </ul>
}
