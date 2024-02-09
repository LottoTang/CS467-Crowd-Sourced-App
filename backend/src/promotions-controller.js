require("dotenv").config();
const express = require('express');
const session = require("express-session");
const axios = require("axios");
const db = require("./promotions-model.js");
const app = express();
const promotionsRouter = express.Router();
const bodyParser = require('body-parser');

const {createPromotion, getPromotionByID} = require("./promotions-model.js");

promotionsRouter.use(bodyParser.json());

promotionsRouter.get("/:id", async (req, res) => {
    try {
        let foundPromotion = await getPromotionByID(req.params.id);
        res.status(200).json(foundPromotion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})

promotionsRouter.post("/", async (req, res) => {
    // store name - search this name to find the id to save
    try {
        let newPromotion = await createPromotion(req.body.promotion_type, req.body.start_date, req.body.end_date);
        res.status(201).json(newPromotion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})  









module.exports = {promotionsRouter};