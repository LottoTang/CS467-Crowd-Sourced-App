
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const axios = require("axios");
const db = require("./items-model.js");
const app = express();
const livefeedsRouter = express.Router();
const bodyParser = require('body-parser');
livefeedsRouter.use(bodyParser.json());

const { createLivefeed, getLivefeedsByID, getAllLivefeeds } = require("./livefeeds-model.js");


livefeedsRouter.post("/", async (req, res) => {
    try {
        let newLivefeed = await createLivefeed(req.body.item_id, req.body.store_id, req.body.review);
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




module.exports = {livefeedsRouter};