
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const axios = require("axios");
const db = require("./items-model.js");
const app = express();
const itemsRouter = express.Router();

authChecker = require("./users-controller.js");

// itemsRouter.post("/", authChecker, (req, res) => {
//     // pass body - req.body.id
//     res.status(201).json()
// })  

  

module.exports = {itemsRouter};