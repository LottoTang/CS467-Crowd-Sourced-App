// Course: CS467 - Capstone
// Topic: Crowded-Sourced Shopping App - Backend (Users Model)
// Author: Long To Lotto Tang
// Creation Date: 1/29/2024

const mongoose = require('mongoose');
const {Items} = require('./items-model');

// Users Schema
const usersSchema = new mongoose.Schema(
  {
    auth_sub: {type: String, required: true},
    shopping_list_item: {type: Object, required: true},
    email: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    shopping_level: {type: Number, required: true},
    feed_item_count: {type: Number, required: true},
    user_creation_date: {type: Date, default: '2024-03-01'},
  },
  {minimize: false},
);

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
    feed_item_count: 0,
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

// UPDATE: Update a User; Return the updated document
const updateUser = async (filter, update) => {
  const result = await Users.updateOne(filter, update);
  return result.modifiedCount;
};

// UPDATE: Update the shopping_level
const updateUserShoppingLevel = async _id => {
  const updateFeedItemCount = await Users.updateOne(
    {
      _id: _id,
    },
    {
      $inc: {
        feed_item_count: 1,
      },
    },
  );

  const document = await Users.findOne({_id: _id});

  // Max level reached
  if (document.shopping_level === 5) {
    return;
  }

  const userFeedItemCount = document.feed_item_count;
  var userShoppingLevel = 0;
  switch (true) {
    case userFeedItemCount >= 0 && userFeedItemCount <= 2:
      userShoppingLevel = 1;
      break;
    case userFeedItemCount >= 3 && userFeedItemCount <= 4:
      userShoppingLevel = 2;
      break;
    case userFeedItemCount >= 5 && userFeedItemCount <= 6:
      userShoppingLevel = 3;
      break;
    case userFeedItemCount >= 7 && userFeedItemCount <= 8:
      userShoppingLevel = 4;
      break;
    case userFeedItemCount >= 9:
      userShoppingLevel = 5;
      break;
  }
  // Update the new shopping level back to database
  const result = await Users.updateOne(
    {_id: _id},
    {shopping_level: userShoppingLevel},
  );

  // Return the number of FeedItemCount (Expected: 1)
  return updateFeedItemCount.modifiedCount;
};

// UPDATE: Lower the shopping_level
const lowerUserShoppingLevel = async _id => {
  const document = await Users.findOne({_id: _id});
  if (document.feed_item_count === 0) {
    return 0;
  }
  const lowerFeedItemCount = await Users.updateOne(
    {
      _id: _id,
    },
    {
      $inc: {
        feed_item_count: -1,
      },
    },
  );
  const userFeedItemCount = document.feed_item_count - 1;
  var userShoppingLevel = 0;
  switch (true) {
    case userFeedItemCount >= 0 && userFeedItemCount <= 2:
      userShoppingLevel = 1;
      break;
    case userFeedItemCount >= 3 && userFeedItemCount <= 4:
      userShoppingLevel = 2;
      break;
    case userFeedItemCount >= 5 && userFeedItemCount <= 6:
      userShoppingLevel = 3;
      break;
    case userFeedItemCount >= 7 && userFeedItemCount <= 8:
      userShoppingLevel = 4;
      break;
    case userFeedItemCount >= 9:
      userShoppingLevel = 5;
      break;
  }
  // Update the new shopping level back to database
  const result = await Users.updateOne(
    {_id: _id},
    {shopping_level: userShoppingLevel},
  );

  // Return the number of FeedItemCount (Expected: 1)
  return lowerFeedItemCount.modifiedCount;
};

// UTILITY FUNCTION: Parse shopping_list_item with items.id
// Expected input:  {"Products.name": ["brandA", "brandB"]}
// Example input:   {"tomato sauce": ["Barilla, Ragu"]}
// Expected output: {"Products.name": {["items_id1", "items_id2"]}}
const parseShoppingListItem = async products => {
  const shoppingListItems = Object.entries(products);
  const shoppingList = {};
  for (const [productTag, brand] of shoppingListItems) {
    // User selected specific brand(s)
    if (brand.length > 0) {
      shoppingList[productTag] = [];
      for (brandName of brand) {
        try {
          const collection = await Items.find(
            {
              product_tags: productTag,
              brand: brandName,
            },
            {_id: 1},
          );
          shoppingList[productTag] = collection;
        } catch (err) {
          console.error(err);
        }
      }
    } else {
      // Return all the documents with that product_tag (no brand selection)
      try {
        const collection = await Items.find(
          {
            product_tags: productTag,
          },
          {_id: 1},
        );
        shoppingList[productTag] = collection;
      } catch (err) {
        console.error(err);
      }
    }
  }
  console.log(shoppingList);
  return shoppingList;
};

module.exports = {
  Users,
  createUsers,
  findUserById,
  findUserByAuthSub,
  updateUser,
  updateUserShoppingLevel,
  lowerUserShoppingLevel,
  parseShoppingListItem,
};
