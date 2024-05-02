const express = require('express')
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const cors = require('cors')
const axios = require('axios')
const app = express()

app.use(bodyParser.json())
app.use(cors())

const commentsByPostID = {}
console.log(commentsByPostID)

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostID[req.params.id] || [])
})

app.post('/posts/:id/comments', async(req, res) => {
    const commentID = randomBytes(4).toString('hex')

    const content  = req.body.content

    const comments = commentsByPostID[req.params.id] || []

    comments.push({ id: commentID, content })

    commentsByPostID[req.params.id] = comments
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data:{
            id: commentID,
            content,
            postId: req.params.id
        }
    })
    res.status(201).send(comments)
})

app.get('/posts/comments', (req, res) => {
    res.send(commentsByPostID || [])
})

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type)
    res.send({})//good to go, empty response
})

app.listen(4002, () => {
    console.log('Listening on port 4002')
})