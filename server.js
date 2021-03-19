const { urlencoded } = require('body-parser')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Item = require('./models/item')

const app = express()
const port = 4000

const dbURI = 'mongodb+srv://user1:zx123456@cluster0.h8t3a.mongodb.net/library?retryWrites=true&w=majority'

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(port, () => console.log(`listening at http://localhost:${port}`)))
.catch(err => console.error(err))

app.use(urlencoded( { extended: true}))
app.use(bodyParser.json())

let dataToClient = {
    userId: 888,
    id: 999,
    title: "staring at the sun..",
    completed: false
    }

app.get('/home', (req, res) => {
  res.send(dataToClient)
})

app.get('/list', (req, res) => {
    Item.find()
    .then( DBresult => res.send(DBresult) ) 
    .catch( err => console.error(err))
})

app.delete('/list:id', (req, res) => {
    const id = req.params.id

    Item.findByIdAndDelete(id)
    .then(result => {
        console.log('delete complete')
        res.send( {note: 'item delete'} )
    })
    .catch(err => console.log('error', err))
})

app.post('/update:id', (req, res) => {
    const id = req.params.id
    const title = req.body.title
    
    Item.findOneAndUpdate({_id: id}, {title: title})
    .then(result => {
        console.log('update complete')
        res.send( {note: 'item update'} )
    })
    .catch(err => console.log('error', err))
})


app.post('/db', (req, res) => {git rm -r folder-name
    console.log(req.body)
    res.send(req.body)

    const item = new Item({
        user: req.body['user'],
        title: req.body['title'],
        type: req.body['type']

    })

    item.save()
    .then()
    .catch( err => console.error(err))
})
