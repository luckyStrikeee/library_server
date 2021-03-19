const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item