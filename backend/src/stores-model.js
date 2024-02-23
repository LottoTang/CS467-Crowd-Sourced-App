// Course: CS467 - Capstone
// Topic: Crowded-Sourced Shopping App - Backend (Stores Model)
// Author: Long To Lotto Tang
// Creation Date: 6/2/2024

const csv = require('csv-parse');
const fs = require('fs');
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

// DELETE: Delete a Store; Return number of modified data (expected: 1)
const deleteById = async _id => {
  const docuument = await Stores.deleteOne({_id: _id});
  return docuument.deletedCount;
};

// DELETE: Delete entire Store Collection (For internal testing only)
const deleteAll = async () => {
  const collection = await Stores.deleteMany();
  return collection.deletedCount;
};

// UTILITY FUNCTION
const readStoresFromCSV = async () => {
  return new Promise(function (resolve, reject) {
    const data = [];
    fs.createReadStream('./corvallis_oregon.csv')
      .pipe(csv.parse({delimiter: ','}))
      .on('data', record => {
        const storeName = record[0];
        data.push(storeName);
      })
      .on('end', () => {
        console.log('CSV file successfully processed.');
        resolve(data);
      })
      .on('error', reject);
  });
};

module.exports = {
  Stores,
  createStores,
  findStoreById,
  findAllStores,
  findItemsInStore,
  updateStore,
  deleteById,
  deleteAll,
  readStoresFromCSV,
};
