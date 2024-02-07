// Course: CS467 - Capstone
// Topic: Crowded-Sourced Shopping App - Backend (Stores Model)
// Author: Long To Lotto Tang
// Creation Date: 6/2/2024

require('dotenv').config();
const mongoose = require('mongoose');

// Stores Schema
const storesSchema = new mongoose.Schema({
  name: {type: String, required: true},
  city: {type: String, required: true},
  state: {type: String, required: true},
});

const Stores = mongoose.model('Stores', storesSchema, 'Stores');

// CREATE: Create Stores
const createStores = async (name, city, state) => {
  const stores = new Stores({
    name: name,
    city: city,
    state: state,
  });
  return stores.save();
};

// READ: Find a Store by _id
const findStoreById = async _id => {
  const query = await Stores.findById(_id).exec();
  return query;
};

// READ: Find all Stores in the collection
const findAllStores = async () => {
  const query = await Stores.find().exec();
  return query;
};

// READ: Find all Items related to a Store (Not Yet Tested)
const findItemsInStore = async _id => {
  const collection = await Items.find({store_id: _id});
  return collection;
};

// UPDATE: Update a Store; Return number of modified data (expected: 1)
const updateStore = async (filter, update) => {
  const result = await Stores.updateOne(filter, update);
  return result.modifiedCount;
};

module.exports = {
  createStores,
  findStoreById,
  findAllStores,
  updateStore,
};
