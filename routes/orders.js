var express = require('express');
var router = express.Router();

require("dotenv").config();

//import models
const Order = require('../models/order');
const Product = require('../models/menu_item');


//get orders
router.get('/', async function (req, res) {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
});

//get orders by buyerId
router.get('/table/:tableId', async function (req, res) {
    try {
        const orders = await Order.find({ table_id: req.params.tableId })
        res.status(200).json(orders)
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
});


//get order by id
router.get('/:id', async function (req, res) {
    try {
        const order = await Order.findById(req.params.id)
        res.status(200).json(order)
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
})

//new order
router.post('/new', async function (req, res) {
    console.log(req.body);

    // if (!req.body.table_id || !req.body.table_id.match(/^[0-9a-fA-F]{24}$/)) {
    //     res.status(400).json({ message: "failed", additional_info: "valid table_id is required" })
    // }

    if (!req.body.products) {
        res.status(400).json({ message: "failed", additional_info: "products is required" })
    }

    else {


        //calculate billAmount

        var billAmount = 0;
        for (var i = 0; i < req.body.products.length; i++) {
            const product = await Product.findById(req.body.products[i].product)
            billAmount += ((parseInt(product.cost) * parseInt(req.body.products[i].quantity)))
        }



        const order = new Order({
            table_id: req.body.table_id,
            products: req.body.products,
            status: req.body.status,
            bill_amount: billAmount,
        })

        try {
            const savedOrder = await order.save()
            res.status(200).json({ message: "success", additional_info: "order created" })
        }
        catch (err) {
            res.status(500).json({ error: err })
        }
    }
})


//update order status
router.patch('/:id/update_status', async function (req, res) {
    try {
        updatedOrder = await Order.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    status: req.body.status,
                }
            },
            { runValidators: true }
        )

        res.status(200).json({ message: "success", additional_info: "order status updated" })
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
})


//delete an order
router.delete('/:id/delete', async function (req, res) {
    try {
        const removedOrder = await Order.remove({ _id: req.params.id })
        res.status(200).json({ message: "success", additional_info: "order deleted" })
    }
    catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;