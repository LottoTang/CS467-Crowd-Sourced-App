
require("dotenv").config();
const express = require("express");
const session = require("express-session");
const axios = require("axios");
const db = require("./users-model.js");
const app = express();

const usersRouter = express.Router();

// Utility Functions
const stringGenerator = (num) => {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  let charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Middleware
const authChecker = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    console.log("Not Authenticated");
    return res.redirect("/user");
  }
};

const options = {
  secret: stringGenerator(20),
  name: "isLoggedIn",
  saveUninitialized: false,
  resave: true,
};

usersRouter.use(session(options));

usersRouter.get("/", (req, res) => {
  if (req.session.isLoggedIn) {
    res.send("You are logged in!");
  } else {
    res.send("You are not logged in!");
  }
});

usersRouter.get("/login", (req, res) => {
  const state = stringGenerator(20);
  const scope = "openid%20profile%20email";
  const loginURL = `https://cs467-crowd-sourced-app.us.auth0.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=http://localhost:3000/user/auth-token&scope=${scope}&state=${state}`;
  res.redirect(loginURL);
});

usersRouter.get("/auth-token", async (req, res) => {
  const authCode = req.query.code;
  const options = {
    method: "POST",
    url: "https://cs467-crowd-sourced-app.us.auth0.com/oauth/token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.SECRET,
      code: authCode,
      redirect_uri: "http://localhost:3000/user/auth-token",
    }),
  };
  try {
    const query = await axios.request(options);
    if (query) {
      req.session.isLoggedIn = true;
      res.redirect("/user");
    }
  } catch (err) {
    console.log("Error:", err);
  }
});

usersRouter.get("/logout", authChecker, (req, res) => {
  req.session.destroy(() => {
    console.log("Session destroyed!");
    res.redirect("/user");
  });
});


module.exports = {
  usersRouter,
  authChecker
};