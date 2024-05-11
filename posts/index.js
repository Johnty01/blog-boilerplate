const express = require('express')

const  app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
const {randomBytes} = require('crypto')
const cors = require('cors')
const axios = require('axios')
app.use(cors())

//in mem db

const posts = {}


app.get('/posts',(req,res)=>{
    res.send(posts)
})

app.post('/posts', async (req,res)=>{

    const id = randomBytes(4).toString('hex')
    const {title} = req.body
    posts[id] = {
        id, title
    }
    await axios.post('http://event-bus-srv:4005/events', {
        type: 'PostCreated',
        data:{
            id, title
        }
    }).catch(err => {
        console.log(err.message)
    })
    res.status(201).send(posts[id])

})

app.post('/events', (req, res) => {
    console.log('Received Event', req.body.type)
    res.send({})//good to go, empty response
})

app.listen(4000,()=>{
    console.log('Listening on 4000');
})