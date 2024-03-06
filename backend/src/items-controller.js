
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const axios = require("axios");
const db = require("./items-model.js");
const app = express();
const itemsRouter = express.Router();
const bodyParser = require('body-parser');

const {authChecker} = require("./users-controller.js");
const {createItem, getItemByID, updateItem, getItemsByTag, getItemByBarcode, getAllItems} = require("./items-model.js");
const {Promotions} = require("./promotions-model.js");
// const {Stores} = require("./stores-model.js");

// use body parser to parse json requests
itemsRouter.use(bodyParser.json());

itemsRouter.get("/allitems", async (req, res) => {
    try {
        let foundItem = await getAllItems();
        res.status(200).json(foundItem);
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: 'No item with this item_id exists.'});
    }
})

itemsRouter.get("/barcode", async (req, res) => {
    try {
        let item = await getItemByBarcode(req.query.barcode_id, req.query.store_id);
        res.status(200).json(item);
    } catch (error) {
        // console.error(error);
        res.status(500).json({ error: 'No item with this barcode exists' });
    }
})

itemsRouter.get("/:id", async (req, res) => {
    try {
        let foundItem = await getItemByID(req.params.id);
        res.status(200).json(foundItem);
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: 'No item with this item_id exists.'});
    }
})

itemsRouter.get("/", async (req, res) => {
    // gets a list of all items with a particular tag, which is in list of foreign keys
    try {
        let items = await getItemsByTag(req.query.tag);
        res.status(200).json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})

itemsRouter.post("/", async (req, res) => {
    // store name - search this name to find the id to save
    try {
        let newItem = await createItem(req.body.store_id, req.body.product_tags, req.body.name,
        req.body.brand, req.body.price, req.body.barcode_id, req.body.promotion_id, req.body.username, req.body.date);
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})  

itemsRouter.patch("/:id", async (req, res) => {
    // Things that can be changed: promotion_id and price
    const keys = Object.keys(req.body)
    const reqLength = Object.keys(req.body).length
    let promotion_change = false;
    let price_change = false;
    let tag_change = false;

    let updatedItem;
    
    for (let i = 0; i < reqLength; i++) {
        if (keys[i] === "promotion_id") {
            promotion_change = true
        }
        if (keys[i] === "price") {
            price_change = true
        }
        if (keys[i] === "product_tags") {
            tag_change = true
        }
    }

    try {
        await updateItem(req.params.id, req.body.price, req.body.promotion_id, req.body.username, req.body.date, req.body.product_tags, price_change, promotion_change, tag_change);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}) 




module.exports = {itemsRouter};