require("dotenv").config();
const express = require('express');
const session = require("express-session");
const axios = require("axios");
const db = require("./products-model.js");
const app = express();
const productsRouter = express.Router();
const bodyParser = require('body-parser');

const {getProductByName, createProduct} = require("./products-model.js");

productsRouter.use(bodyParser.json());

productsRouter.get("/:id", async (req, res) => {
    try {
        let foundProduct = await getProductByName(req.params.id);
        res.status(200).json(foundProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})

productsRouter.post("/", async (req, res) => {
    // store name - search this name to find the id to save
    try {
        let newProduct = await createProduct(req.body.name, req.body.brands);
        if (newProduct === 404) {
            res.status(400).json({ error: 'A tag with this name already exists' })
        } else {
            console.log(newProduct)
            res.status(201).json(newProduct);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})  




module.exports = {productsRouter};