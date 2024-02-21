require("dotenv").config();
const express = require('express');
const session = require("express-session");
const axios = require("axios");
const db = require("./products-model.js");
const app = express();
const productsRouter = express.Router();
const bodyParser = require('body-parser');

const {getProductByName, createProduct, getBrandsOfProduct, getProductBySubstring} = require("./products-model.js");

productsRouter.use(bodyParser.json());

productsRouter.get("/", async (req, res) => {
    // gets all products with a certain tag
    try {
        let foundProduct = await getProductByName(req.query.name);
        res.status(200).json(foundProduct);
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: 'No product with this name exists.'});
    }
})

productsRouter.get("/search", async (req, res) => {
    // get all products with a substring in them
    try {
        let foundProduct = await getProductBySubstring(req.query.name);
        res.status(200).json(foundProduct);
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: 'No product names containing this substring exist.'});
    }
})

productsRouter.post("/", async (req, res) => {
    // store name - search this name to find the id to save
    try {
        let newProduct = await createProduct(req.body.name, req.body.brands);
        if (newProduct === 404) {
            res.status(400).json({ error: 'A tag with this name already exists' })
        } else {
            res.status(201).json(newProduct);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})  

productsRouter.get("/brands", async (req, res) => {
    try {
        let foundProduct = await getBrandsOfProduct(req.query.name);
        res.status(200).json(foundProduct);
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: 'No product with this name exists.'});
    }
})


module.exports = {productsRouter};