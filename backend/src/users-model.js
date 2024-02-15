// Course: CS467 - Capstone
// Topic: Crowded-Sourced Shopping App - Backend (Users Model)
// Author: Long To Lotto Tang
// Creation Date: 1/29/2024

require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECT_STRING, {useNewUrlParser: true});
const db = mongoose.connection;

db.once('open', () => {
  console.log('Successfully connected to MongoDB using Mongoose.');
});

// Users Schema
const usersSchema = new mongoose.Schema({
  auth_sub: {type: String, required: true},
  shopping_list_item: {type: Object, required: true},
  email: {type: String, required: true},
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  username: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
  shopping_level: {type: Number, required: true},
});

const Users = mongoose.model('Users', usersSchema, 'Users');

// CREATE: Create Users
const createUsers = async (
  auth_sub,
  email,
  firstname,
  lastname,
  username,
  city,
  state,
) => {
  const users = new Users({
    auth_sub: auth_sub,
    shopping_list_item: {},
    email: email,
    firstname: firstname,
    lastname: lastname,
    username: username,
    city: city,
    state: state,
    shopping_level: 1,
  });
  return users.save();
};

// READ: Find by _id or auth_sub
const findUserById = async _id => {
  const document = await Users.findById(_id).exec();
  return document;
};

const findUserByAuthSub = async auth_sub => {
  const document = await Users.findOne({auth_sub: auth_sub}).exec();
  return document;
};

// UPDATE: Update a User; Return number of modified data (expected: 1)
const updateUser = async (filter, update) => {
  const result = await Users.updateOne(filter, update);
  return result.modifiedCount;
};

// UPDATE: Update the shopping_level (Not Yet Implemented)
const updateUserShoppingLevel = async auth_sub => {
  return;
};

// UTILITY FUNCTION: Parse shopping_list_item with documents (NOT YET TESTED)
// Expected input: {"tomato sauce": ["brandA, brandB"]}
// Expected output: {"tomato sauce": [{document1}, {document2}]}
const parseShoppingListItem = async body => {
  const shoppingListItems = Object.entries(body);
  const shoppingList = {};
  for (const [name, brand] of shoppingListItems) {
    // User selected specific brand(s)
    if (brand) {
      for (brandName of brand) {
        const collection = await Items.find({name: name, brand: brandName});
        shoppingList[name] = collection;
      }
    } else {
      // User did not select any brand
      const collection = await Items.find({name: name});
      shoppingList[name] = collection;
    }
  }
  return shoppingList;
};

module.exports = {
  createUsers,
  findUserById,
  findUserByAuthSub,
  updateUser,
  parseShoppingListItem,
};
