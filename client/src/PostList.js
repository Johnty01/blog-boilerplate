import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CommentCreate from './CommentCreate'
import CommentList from './CommentList'

export default () =>{
    const [posts, setPosts] = useState({}) // it is an array in server for the api resp

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4000/posts/')

        setPosts(res.data)
    }
    //useEffect can be used at a very specific points in time in the life cycle of a component
    //we wanna run the fetchPosts only when the component is first displayed on the screen
    useEffect(()=>{
        fetchPosts()
    }, []) // empty array is gonna tell react that it is gonna run only once
    console.log(posts)

    const renderedPosts = Object.values(posts).map(post => {
        return (
        <div 
        className='card' 
        style={{ width: '30%', marginBottom:'20px' }}
        key = {post.id}
        >
            <div className = 'card-body'>
                <h3>{post.title}</h3>
                <CommentList postId={post.id} />
                <CommentCreate postId={post.id}/>
            </div>
        </div>
        )
    })

    return <div className='d-flex flex-row flex-wrap justify-content-between'>
        {renderedPosts}
    </div>
}