const mongoose = require('mongoose')

const tableSchema = mongoose.Schema({
    number: {
        type: String,
    },

    status: {
        enum: ["UNOCCUPIED", "ORDERING", "DELIVERED", "PAYED", null]
    }
})

module.exports = mongoose.model('Table', tableSchema)