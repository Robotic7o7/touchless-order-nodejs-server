const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({

    table_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "tables"
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "menuitems",
                required: true
            },

            quantity: {
                type: Number,
                required: true
            },
        }
    ],

    status: {
        type: String,
        required: true,
        enum: ['PAYMENT_PENDING', 'PAYMENT_SUCCESS', 'PAYMENT_FAILED', 'CANCELLED', 'ORDER_PLACED'],
        default: 'PAYMENT_PENDING'
    },

    bill_amount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Order', orderSchema)