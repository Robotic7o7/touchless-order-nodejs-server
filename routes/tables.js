var express = require("express");
var router = express.Router();

//import models
const Table = require("../models/table");

//get tables
router.get("/", async function (req, res) {
  try {
    const tables = await Table.find();
    res.status(200).json(tables);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//get buyer by id
router.get("/:id", async function (req, res) {
  try {
    const table = await Table.findById(req.params.id);
    res.status(200).json(table);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//new buyer
router.post("/new", async function (req, res) {
  const table = new Table({
    number: req.body.number,
    billAmount: req.body.billAmount,
    status: req.body.status
  });

  try {
    const savedTable = await table.save();
    res
      .status(200)
      .json({ message: "success", additional_info: "table created" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});


//update a buyer
router.patch("/:id/update_order", async function (req, res) {
  try {
    updatedTable = await Table.updateOne(
      { _id: req.params.id },
      {
        $set: {
          order: req.body.order,
          billAmount: req.body.billAmount
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

//update a buyer
router.patch("/:id/update_status", async function (req, res) {
  try {
    updatedTable = await Table.updateOne(
      { _id: req.params.id },
      {
        $set: {
          order: "",
          status: "EMPTY",
          billAmount: ""
        }
      },
      { runValidators: true }
    );

    res
      .status(200)
      .json({ message: "success", additional_info: "Table updated" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

router.patch("/:id/update_ordertracking", async function (req, res) {
  try {
    updatedTable = await Table.updateOne(
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
      .json({ message: "success", additional_info: "order status updated" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//delete a buyer
router.delete("/:id/delete", async function (req, res) {
  try {
    const removedTable = await Table.remove({ _id: req.params.id });
    res
      .status(200)
      .json({ message: "success", additional_info: "Table deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

