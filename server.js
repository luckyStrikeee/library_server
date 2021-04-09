const { urlencoded } = require('body-parser')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Item = require('./models/item')
const dbURI = require('./dbURI')

const app = express()
const port = 4000

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

app.get('/list:user', (req, res) => {
    const user = req.params.user

    Item.find({user: user})
    .then( DBresult => res.send(DBresult) ) 
    .catch( err => console.error(err))
})

app.delete('/list:id', (req, res) => {
    const id = req.params.id

    Item.findOneAndDelete({item_id: id})
    .then(result => {
        console.log(`delete ${id} complete`)
        res.send( {note: `item deleted`} )
    })
    .catch(err => console.log('error', err))
})

app.post('/update:id', (req, res) => {
    const id = req.params.id
    const title = req.body.title
    
    Item.findOneAndUpdate({item_id: id}, {title: title})
    .then(result => {
        console.log('update complete')
        res.send( {note: 'item update'} )
    })
    .catch(err => console.log('error', err))
})


app.post('/db', (req, res) => {
    console.log(req.body)
    res.send(req.body)

    const item = new Item({
        user: req.body['user'],
        title: req.body['title'],
        type: req.body['type'],
        item_id: req.body['item_id']
    })

    item.save()
    .then()
    .catch( err => console.error(err))
})
