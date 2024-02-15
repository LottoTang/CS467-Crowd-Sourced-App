// Course: CS467 - Capstone
// Topic: Crowded-Sourced Shopping App - Backend (User Controller)
// Author: Long To Lotto Tang
// Creation Date: 1/29/2024

const express = require('express');
const db = require('./users-model.js');
const bodyParser = require('body-parser');

const usersRouter = express.Router();
usersRouter.use(bodyParser.json());

// CREATE: Create a User to database
usersRouter.post('/', async (req, res) => {
  const userAuthSub = req.body.userAuthSub;
  try {
    const isRegistered = await db.findUserByAuthSub(userAuthSub);
    if (isRegistered) {
      res.status(409).send({Message: 'Redircting to mainpage.'});
    } else {
      const userEmail = req.body.email;
      const userFirstName = req.body.firstName;
      const userLastName = req.body.lastName;
      const userCity = 'Corvallis';
      const userState = 'OR';
      // Data validation: firstName and lastName is not empty
      if (!userFirstName || !userLastName) {
        return res
          .status(400)
          .send({Error: 'Missing one of the required fields.'});
      }
      try {
        const user = await db.createUsers(
          userAuthSub,
          userEmail,
          userFirstName,
          userLastName,
          userCity,
          userState,
        );
        res.status(201).send(user);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// READ: Read a User's profile (Users can see other's profile)
usersRouter.get('/:_id', async (req, res) => {
  const userID = req.params._id;
  try {
    const document = await db.findUserById(userID);
    res.status(200).send(document);
  } catch (err) {
    console.error(err);
    res.status(404).send({Error: 'No user with this users._id exists.'});
  }
});

// UPDATE: Update User's personal particulars
usersRouter.patch('/:_id', async (req, res) => {
  const userID = req.params._id;
  try {
    const document = await db.findUserById(userID);
    const update = {};
    if (req.body.userFirstName) update.userFirstName = req.body.userFirstName;
    if (req.body.userLastName) update.userLastName = req.body.userLastName;
    if (req.body.userName) update.userName = req.body.userName;
    try {
      const updateCount = await db.updateUser({_id: userID}, update);
      // return the number of modified item (Expected: 1)
      res.status(200).send({updateCount: updateCount});
    } catch (err) {
      console.error(err);
      res.status(500).send({Error: 'Internal Server Error'});
    }
  } catch (err) {
    console.error(err);
    res.status(404).send({Error: 'No user with this users._id exists.'});
  }
});

// UPDATE: Update User's shopping_list_item
usersRouter.patch('/shopping-list-item/:_id', async (req, res) => {
  const userID = req.params._id;
  try {
    const document = await db.findUserById(userID);
    const shoppingListItem = req.body;
    try {
      const parsedShoppingListItem = await db.parseShoppingListItem(
        shoppingListItem,
      );
      // Update shopping_list_item to database
      const update = {};
      update.shopping_list_item = parsedShoppingListItem;
      try {
        const updateCount = await db.updateUser({_id: userID}, update);
        res.status(200).send({updateCount: updateCount});
      } catch (err) {
        console.error(err);
        res.status(500).send({Error: 'Internal Server Error'});
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({Error: 'Internal Server Error'});
    }
  } catch (err) {
    console.error(err);
    res.status(404).send({Error: 'No user with this users._id exists.'});
  }
});

module.exports = {usersRouter};
