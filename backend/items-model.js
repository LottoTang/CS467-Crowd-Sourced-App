
// require("dotenv").config();
// const { auth } = require("express-openid-connect");
const mongoose = require("mongoose");

// Connect to the Atlas cluster or local MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

// // Create model

// Items - CRUD
const itemsSchema = new mongoose.Schema({
  item_id: { type: String, required: true },
  store_id: { type: Array, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  barcode: { type: String, required: true }
});

const Items = mongoose.model("Items", itemsSchema, "Items");

const createItem = async (item_id, store_id, name, brand, category, price, barcode) => {
  const items = new Users({
    item_id: item_id,
    store_id: store_id,
    name: name,
    brand: brand,
    category: category,
    price: price,
    barcode: barcode
  });
  return items.save();
};

module.exports = {
  createItem
};
