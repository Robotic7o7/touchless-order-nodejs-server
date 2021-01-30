const mongoose = require('mongoose')

const menuItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    cost: {
        type: Number
    },

    status: {
        enum: ["AVAILABLE", "UNAVAILABLE", null]
    }
})

module.exports = mongoose.model('MenuItem', menuItemSchema)