const express = require('express')
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto')
const cors = require('cors')
const app = express()

app.use(bodyParser.json())
app.use(cors())

const commentsByPostID = {}

app.get('/posts/:id/comments', (req,res)=>{
    res.send(commentsByPostID[req.params.id] || [])
})

app.post('/posts/:id/comments', (req,res)=>{
 const commentID = randomBytes(4).toString('hex')



 const content = req.body

 const comments = commentsByPostID[req.params.id] || []

 comments.push({id: commentID, content})

 commentsByPostID[req.params.id] = comments
})

app.listen(4002, ()=>{
    console.log('Listening on port 4002')
})