const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    events: [
        {
            day: {
                type: String,
            },
            time: {
                type: String,
            },
            text: {
                type: String,
            }
        }
    ]
})

module.exports = mongoose.model('users', userSchema)
