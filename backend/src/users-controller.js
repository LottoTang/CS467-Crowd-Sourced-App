// Course: CS467 - Capstone
// Topic: Crowded-Sourced Shopping App - Backend (User Controller)
// Author: Long To Lotto Tang
// Creation Date: 1/29/2024

const express = require('express');
const db = require('./users-model.js');
const bodyParser = require('body-parser');

const usersRouter = express.Router();
usersRouter.use(bodyParser.json());

// UTILITY ROUTE: Check if User is new / existing
usersRouter.get('/checker/:_id', async (req, res) => {
  const userAuthSub = req.params._id;
  try {
    const document = await db.findUserByAuthSub(userAuthSub);
    if (document) {
      res.status(200).send(document);
    } else {
      res
        .status(404)
        .send({Message: 'New User, redirecting to registration page.'});
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error.');
  }
});

// CREATE: Create a User to database
usersRouter.post('/', async (req, res) => {
  const userAuthSub = req.body.auth_sub;
  try {
    const document = await db.findUserByAuthSub(userAuthSub);
    if (document) {
      res.status(200).send(document);
    } else {
      const userEmail = req.body.email;
      const userFirstName = req.body.firstname;
      const userLastName = req.body.lastname;
      const userUserName = req.body.username;
      const userCity = req.body.city;
      const userState = req.body.state;
      // Data validation: firstName and lastName is not empty
      if (!userFirstName || !userLastName || !userUserName) {
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
          userUserName,
          userCity,
          userState,
        );
        res.status(201).send(user);
      } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error.');
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error.');
  }
});

// READ: Read a User's profile
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

// UPDATE: Update User's
usersRouter.patch('/:_id', async (req, res) => {
  const userID = req.params._id;
  try {
    const document = await db.findUserById(userID);
    const update = {};
    if (req.body.firstname) update.firstname = req.body.firstname;
    if (req.body.lastname) update.lastname = req.body.lastname;
    if (req.body.username) update.username = req.body.username;
    if (req.body.city) update.city = req.body.city;
    if (req.body.state) update.state = req.body.state;
    if (req.body.user_creation_date) update.user_creation_date = req.body.user_creation_date;
    try {
      // If updateCount === 1, return the updated document
      const updateCount = await db.updateUser({_id: userID}, update);
      if (updateCount === 1) {
        try {
          const document = await db.findUserById(userID);
          res.status(200).send(document);
        } catch (err) {
          console.error(err);
          res.status(404).send({Error: 'No user with this users._id exists.'});
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({Error: 'Internal server error.'});
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
        // If updateCount === 1, return the updated document
        if (updateCount === 1 || updateCount === 0) {
          try {
            const document = await db.findUserById(userID);
            res.status(200).send(document);
          } catch (err) {
            console.error(err);
            res
              .status(404)
              .send({Error: 'No user with this users._id exists.'});
          }
        }
      } catch (err) {
        console.error(err);
        res.status(500).send({Error: 'Internal server error.'});
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({Error: 'Internal server error.'});
    }
  } catch (err) {
    console.error(err);
    res.status(404).send({Error: 'No user with this users._id exists.'});
  }
});

// UPDATE: Increase feed_item_count and user_shopping_level
usersRouter.patch('/shopping_level/:_id', async (req, res) => {
  const userID = req.params._id;
  try {
    const document = db.findUserById(userID);
    try {
      const updateCount = await db.updateUserShoppingLevel(userID);
      if (updateCount === 1) {
        try {
          const document = await db.findUserById(userID);
          res.status(200).send(document);
        } catch (err) {
          console.error(err);
          res.status(404).send({Error: 'No user with this users._id exists.'});
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({Error: 'Internal server error.'});
    }
  } catch (err) {
    console.error(err);
    res.status(404).send({Error: 'No user with this users._id exists.'});
  }
});

// UPDATE: Decrease feed_item_count and user_shopping_level
usersRouter.patch('/lower_shopping_level/:_id', async (req, res) => {
  const userID = req.params._id;
  try {
    const document = db.findUserById(userID);
    try {
      const updateCount = await db.lowerUserShoppingLevel(userID);
      // updateCount: 0
      // (User already with 0 item_feed_count, cannot deduct anymore)
      // updateCount: 1 (deducted item_feed_count and checked shopping_level)
      if (updateCount === 0 || updateCount === 1) {
        try {
          const document = await db.findUserById(userID);
          res.status(200).send(document);
        } catch (err) {
          console.error(err);
          res.status(404).send({Error: 'No user with this users._id exists.'});
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({Error: 'Internal server error.'});
    }
  } catch (err) {
    console.error(err);
    res.status(404).send({Error: 'No user with this users._id exists.'});
  }
});

module.exports = {usersRouter};
