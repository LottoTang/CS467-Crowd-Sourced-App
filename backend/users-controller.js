// Course: CS467 - Capstone
// Topic: Crowded-Sourced Shopping App - Backend (User Controller)
// Author: Long To Lotto Tang
// Creation Date: 1/29/2024
// Remarks: Auth0 Default: Login (users/login); Logout (users/logout)

require('dotenv').config();
const express = require('express');
const db = require('./users-model.js');
const {auth, requiresAuth} = require('express-openid-connect');
const asyncHandler = require('express-async-handler');
const bodyParser = require('body-parser');

const usersRouter = express.Router();
const jsonParser = bodyParser.json();

// Utility Functions
const stringGenerator = numChar => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  const charactersLength = characters.length;
  for (var i = 0; i < numChar; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

usersRouter.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

const USERS_BASE_URL = 'http://localhost:3000/users';

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: USERS_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}`,
  secret: stringGenerator(20),
};

usersRouter.use(auth(config));

usersRouter.get(
  '/',
  asyncHandler(async (req, res) => {
    if (req.oidc.isAuthenticated()) {
      // Check if new user/existing user
      const document = await db.findUserByAuthSub(req.oidc.user.sub);
      if (!document) {
        // Tell the frontend to redirect to fill in information page
        res.status(200).send('Tell frontend to go to information page.');
      } else {
        // Existing user, return the data
        res.status(200).send(document);
      }
    } else res.send('Logged Out');
  }),
);

// CREATE: Create a User to database
usersRouter.post(
  '/',
  requiresAuth(),
  jsonParser,
  asyncHandler(async (req, res) => {
    const userInfo = req.oidc.user;
    const fullname = req.body.fullname;
    const username = req.body.username;
    const city = req.body.city;
    const state = req.body.state;
    // Data Validation: req.body entry is not empty
    if (!fullname || !username || !city || !state) {
      return res
        .status(400)
        .send({Error: 'Missing one of the required fields.'});
    }
    const user = await db.createUsers(
      userInfo.sub,
      userInfo.email,
      fullname,
      username,
      city,
      state,
    );
    res.status(201).send(user);
  }),
);

// READ: Read a User's profile (Users can see other's profile)
usersRouter.get(
  '/:_id',
  requiresAuth(),
  asyncHandler(async (req, res) => {
    const userID = req.params._id;
    const document = await db.findUserById(userID);
    res.status(200).send(document);
  }),
);

// UPDATE: Update User's personal particulars (Only User himself can modify)
usersRouter.patch(
  '/:_id',
  requiresAuth(),
  jsonParser,
  asyncHandler(async (req, res) => {
    const userID = req.params._id;
    const document = await db.findUserById(userID);
    if (document.auth_sub === req.oidc.user.sub) {
      const update = {};
      if (req.body.fullname) update.fullname = req.body.fullname;
      if (req.body.username) update.username = req.body.username;
      if (req.body.city) update.city = req.body.city;
      if (req.body.state) update.state = req.body.state;
      const updateCount = await db.updateUser({_id: userID}, update);
      // return the number of modified item (Expected: 1)
      res.status(200).send({updateCount: updateCount});
    } else {
      res.status(401).send({Error: 'Unauthorized operation.'});
    }
  }),
);

// UPDATE: Update User's shopping_list_item (Temporary Code)
usersRouter.patch(
  '/shopping-list-item/:_id',
  requiresAuth(),
  jsonParser,
  asyncHandler(async (req, res) => {
    const userID = req.params._id;
    const document = db.findUserById(userID);
    const shoppingListItem = req.body;
    if (document.auth_sub === req.oidc.user.sub) {
      const parsedShoppingListItem =
        await db.parseShoppingListItem(shoppingListItem);
      // Update shopping_list_item to database
      const update = {};
      update.shopping_list_item = parsedShoppingListItem;
      const updateCount = await db.updateUser({_id: userID}, update);
      res.status(200).send({updateCount: updateCount});
    } else {
      res.status(401).send({Error: 'Unauthorized operation.'});
    }
  }),
);

module.exports = {usersRouter};
