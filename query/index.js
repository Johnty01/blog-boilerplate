const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

app.get('/posts', (req,res) => {
    res.send(posts)
})

app.post('/events', (req,res) => {
    const { type, data } = req.body

    if (type === 'PostCreated') {
        const { id, title } = req.body
        posts[id] = { id, title, comments : []}
    }

    if (type === 'CommentCreated') {
        const { id, content, postId } = req.body
        posts[postId].comments.push( { id, content })
    }
    res.send({})
})

app.listen(4001, () => {
    console.log('Listening on 4002')
})