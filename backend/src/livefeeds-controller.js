
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const axios = require("axios");
const app = express();
const livefeedsRouter = express.Router();
const bodyParser = require('body-parser');
livefeedsRouter.use(bodyParser.json());

const { createLivefeed, getLivefeedsByID, getAllLivefeeds, updateLivefeed, deleteLivefeed } = require("./livefeeds-model.js");


livefeedsRouter.post("/", async (req, res) => {
    try {
        let newLivefeed = await createLivefeed(req.body.item_id, req.body.store_id, req.body.review, req.body.price);
        res.status(201).json(newLivefeed);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
})  

livefeedsRouter.get("/:id", async (req, res) => {
    try {
        let foundLivefeed = await getLivefeedsByID(req.params.id);
        res.status(200).json(foundLivefeed);
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: 'No livefeed with this livefeed_id exists.'});
    }
})

livefeedsRouter.get("/", async (req, res) => {
    try {
        let foundLivefeed = await getAllLivefeeds();
        res.status(200).json(foundLivefeed);
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: 'No livefeed with this livefeed_id exists.'});
    }
})

livefeedsRouter.patch("/:id", async (req, res) => {
    // Things that can be changed: promotion_id and price
    const keys = Object.keys(req.body)
    const reqLength = Object.keys(req.body).length
    let item_change = false;
    let store_change = false;
    let review_change = false;
    
    for (let i = 0; i < reqLength; i++) {
        if (keys[i] === "item_id") {
            item_change = true
        }
        if (keys[i] === "store_id") {
            store_change = true
        }
        if (keys[i] === "review") {
            review_change = true
        }
    }

    try {
        await updateLivefeed(req.params.id, req.body.item_id, req.body.store_id, req.body.review, item_change, store_change, review_change);
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong' });
    }
}) 


livefeedsRouter.delete("/:id", async (req, res) => {
    try {
        let deletedLivefeed = await deleteLivefeed(req.params.id);
        res.status(204).json();
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: 'No livefeed with this livefeed_id exists.'});
    }
})





module.exports = {livefeedsRouter};