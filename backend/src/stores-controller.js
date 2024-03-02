// Course: CS467 - Capstone
// Topic: Crowded-Sourced Shopping App - Backend (Store Controller)
// Author: Long To Lotto Tang
// Creation Date: 6/2/2024

const express = require('express');
const db = require('./stores-model.js');
const bodyParser = require('body-parser');

const storesRouter = express.Router();
storesRouter.use(bodyParser.json());

// CREATE: Create a Store to database
storesRouter.post('/', async (req, res) => {
  const storeName = req.body.name;
  const storeCity = req.body.city;
  const storeState = req.body.state;

  // Data Validation: all fields are not empty
  if (!storeName || !storeCity || !storeState) {
    return res.status(400).send({Error: 'Missing one of the required fields.'});
  }
  try {
    const store = await db.createStores(storeName, storeCity, storeState);
    res.status(201).send(store);
  } catch (err) {
    console.error(err);
    res.status(500).send({Error: 'Internal server error.'});
  }
});

// CREATE: Create all Stores from CSV
storesRouter.post('/add-all', async (req, res) => {
  var createCounter = 0;
  try {
    const data = await db.readStoresFromCSV();
    const dataCounter = data.length;
    const storeCity = 'Corvallis';
    const storeState = 'OR';
    for (storeName of data) {
      try {
        const store = await db.createStores(storeName, storeCity, storeState);
        createCounter += 1;
      } catch (err) {
        console.error(err);
        res.status(500).send({Error: 'Internal server error.'});
      }
    }
    if (dataCounter == dataCounter) {
      res.status(201).send({
        Message: `${createCounter}/${dataCounter} documents created.`,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({Error: 'Internal server error.'});
  }
});

// READ: Read a Store
storesRouter.get('/:_id', async (req, res) => {
  const storeID = req.params._id;
  try {
    const document = await db.findStoreById(storeID);
    res.status(200).send(document);
  } catch (err) {
    console.error(err);
    res.status(404).send({Error: 'No store with this stores._id exists.'});
  }
});

// READ: Read all Stores
storesRouter.get('/', async (req, res) => {
  try {
    const collection = await db.findAllStores();
    res.status(200).send(collection);
  } catch (err) {
    console.error(err);
    res.status(500).send({Error: 'Internal server error.'});
  }
});

// UPDATE: Update a Store
storesRouter.patch('/:_id', async (req, res) => {
  const storeId = req.params._id;
  try {
    const document = await db.findStoreById(storeId);
    const update = {};
    if (req.body.name) update.name = req.body.name;
    if (req.body.city) update.city = req.body.city;
    if (req.body.state) update.state = req.body.state;
    try {
      const updateCount = await db.updateStore({_id: storeId}, update);
      // if updateCount === 1, return the updated document
      if (updateCount === 1) {
        try {
          const document = await db.findStoreById(storeId);
          res.status(200).send(document);
        } catch (err) {
          console.error(err);
          res
            .status(404)
            .send({Error: 'No store with this stores._id exists.'});
        }
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({Error: 'Internal server error.'});
    }
  } catch (err) {
    console.error(err);
    res.status(404).send({Error: 'No store with this stores._id exists.'});
  }
});

// DELETE: Delete a Store
storesRouter.delete('/:_id', async (req, res) => {
  const storeId = req.params._id;
  try {
    const deleteCount = await db.deleteById(storeId);
    res.status(200).send({deleteCount: deleteCount});
  } catch (err) {
    console.error(err);
    res.status(500).send({Error: 'Internal server error.'});
  }
});

// DELETE: Delete all Store (for internal testing only)
storesRouter.delete('', async (req, res) => {
  try {
    const deleteCount = await db.deleteAll();
    res.status(200).send({deleteCount: deleteCount});
  } catch (err) {
    console.error(err);
    res.status(500).send({Error: 'Internal server error.'});
  }
});

module.exports = {storesRouter};
