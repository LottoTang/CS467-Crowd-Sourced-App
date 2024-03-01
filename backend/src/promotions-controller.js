require("dotenv").config();
const express = require('express');
const session = require("express-session");
const axios = require("axios");
const db = require("./promotions-model.js");
const app = express();
const promotionsRouter = express.Router();
const bodyParser = require('body-parser');

const {createPromotion, getPromotionByID, deletePromotion, updatePromotion, getPromotionBySubstring} = require("./promotions-model.js");

promotionsRouter.use(bodyParser.json());

promotionsRouter.get("/search", async (req, res) => {
    // get all promotions with a substring in them
    try {
        let foundPromotion = await getPromotionBySubstring(req.query.promotion_type);
        res.status(200).json(foundPromotion);
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: 'No promotion names containing this substring exist.'});
    }
})

promotionsRouter.get("/:id", async (req, res) => {
    try {
        let foundPromotion = await getPromotionByID(req.params.id);
        res.status(200).json(foundPromotion);
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: 'No item with this item_id exists.'});
    }
})

promotionsRouter.post("/", async (req, res) => {
    // store name - search this name to find the id to save
    try {
        let newPromotion = await createPromotion(req.body.promotion_type, req.body.start_time, req.body.end_time);
        res.status(201).json(newPromotion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})  

promotionsRouter.delete("/:id", async (req, res) => {
    try {
        let deletedPromotion = await deletePromotion(req.params.id)
        res.status(204).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})

promotionsRouter.patch("/:id", async (req, res) => {
    // Things that can be changed: promotion_id and price
    const keys = Object.keys(req.body)
    const reqLength = Object.keys(req.body).length
    let name_change = false;
    let start_change = false;
    let end_change = false;

    let updatedItem;
    console.log(keys)
    
    for (let i = 0; i < reqLength; i++) {
        if (keys[i] === "promotion_type") {
            name_change = true
        }
        if (keys[i] === "start_time") {
            start_change = true
        }
        if (keys[i] === "end_time") {
            end_change = true
        }
    }

    try {
        await updatePromotion(req.params.id, req.body.promotion_type, req.body.start_time, req.body.end_time, name_change, start_change, end_change);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}) 


module.exports = {promotionsRouter};