require("dotenv").config();
const express = require('express');
const session = require("express-session");
const axios = require("axios");
const db = require("./products-model.js");
const app = express();
const productsRouter = express.Router();
const bodyParser = require('body-parser');

const {} = require("./products-model.js");

productsRouter.use(bodyParser.json());

productsRouter.get("/", async (req, res) => {
    try {
        let foundProduct = await getProductByName(req.params.id);
        res.status(200).json(foundProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})






module.exports = {productsRouter};