
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const axios = require("axios");
const db = require("./items-model.js");
const app = express();
const itemsRouter = express.Router();
const bodyParser = require('body-parser');

const {authChecker} = require("./users-controller.js");
const {createItem, getItemByID} = require("./items-model.js");

// use body parser to parse json requests
itemsRouter.use(bodyParser.json());


itemsRouter.get("/", async (req, res) => {
    try {
        let foundItem = await getItemByID(req.query.id);
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
        let newItem = await createItem(req.body.store_name, req.body.name, req.body.product_type,  req.body.brand, req.body.category, req.body.price, req.body.barcode);
        res.status(201).json(newItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})  



module.exports = {itemsRouter};