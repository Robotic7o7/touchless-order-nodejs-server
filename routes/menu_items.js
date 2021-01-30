var express = require("express");
var router = express.Router();

//import models
const MenuItems = require("../models/menu_item");

//get all Items
router.get("/", async function (req, res) {
    try {
        const items = await MenuItems.find();
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get Item by id
router.get("/:id", async function (req, res) {
    try {
        const item = await MenuItems.findById(req.params.id);
        res.status(200).json(item);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//new Menu Item
router.post("/new", async function (req, res) {
    const menuItem = new MenuItems({
        name: req.body.name,
        description: req.body.description,
        cost: req.body.cost,
        status: req.body.status
    });

    try {
        const savedItem = await menuItem.save();
        res
            .status(200)
            .json({ message: "success", additional_info: "menu Item added" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});


//update a Menu Item
router.patch("/:id/update_item", async function (req, res) {
    try {
        updatedItem = await MenuItems.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    name: req.body.name,
                    description: req.body.description,
                    cost: req.body.cost,
                    status: req.body.status
                }
            },
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "order placed updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//update status of a Menu Item
router.patch("/:id/update_status", async function (req, res) {
    try {
        updatedItem = await MenuItems.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    status: req.body.status
                }
            },
            { runValidators: true }
        );

        res
            .status(200)
            .json({ message: "success", additional_info: "Menu Item updated" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//delete a Menu Item
router.delete("/:id/delete", async function (req, res) {
    try {
        const removedItem = await MenuItems.remove({ _id: req.params.id });
        res
            .status(200)
            .json({ message: "success", additional_info: "Item deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

