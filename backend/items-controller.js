
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const axios = require("axios");
const db = require("./items-model.js");
const app = express();
const itemsRouter = express.Router();
const bodyParser = require('body-parser');

const {authChecker} = require("./users-controller.js");
const {createItem, getItemByID, updateItem} = require("./items-model.js");

// use body parser to parse json requests
itemsRouter.use(bodyParser.json());


itemsRouter.get("/:id", async (req, res) => {
    try {
        let foundItem = await getItemByID(req.params.id);
        console.log(foundItem);
        res.status(200).json(foundItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})

itemsRouter.post("/", async (req, res) => {
    // boat- req.body.id
    // store name - search this name to find the id to save
    // createItem(req.body.store_name, req.body.name, req.body.product_type,  req.body.brand, req.body.category, req.body.price, req.body.barcode)
    // res.status(201).json()
    try {
        let newItem = await createItem(req.body.store_name, req.body.product_type, req.body.name,  req.body.brand, req.body.category, req.body.price, req.body.barcode_id, req.body.promotion_id);
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})  

itemsRouter.patch("/:id", async (req, res) => {
    // Things that can be changed: promotion_id and price
    // const keys = Object.keys(req.body)
    // const reqLength = Object.keys(req.body).length
    // let promotion_change = false;
    // let price_change = false;

    // let new_promotion = null;
    // let new_price = null;

    let updatedItem;
    
    // for (let i = 0; i < reqLength; i++) {
    //     if (keys[i] === "promotion") {
    //         promotion_change = true
    //         new_promotion = req.body.promotion_id
    //     }
    //     if (keys[i] === "price") {
    //         price_change = true
    //         new_price = req.body.price
    //     }
    // }

    try {
        updatedPromotion = await updateItem(req.params.id, req.body.price, req.body.promotion_id);
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }

}) 


module.exports = {itemsRouter};