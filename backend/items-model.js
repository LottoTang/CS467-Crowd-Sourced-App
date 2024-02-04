
// require("dotenv").config();
// const { auth } = require("express-openid-connect");
const mongoose = require("mongoose");

// Connect to the Atlas cluster or local MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

// // Create model
// replace store_id in schema with { type: mongoose.Schema.Types.ObjectId, ref: 'Stores', required: true }, once stores is done

// Items - CRUD
const itemsSchema = new mongoose.Schema({
  store_id:  { type: String, required: true }, 
  // replace store_id in schema with { type: mongoose.Schema.Types.ObjectId, ref: 'Stores', required: true }, once stores is done
  product_id: {type: String, required: true},
  // replace with product_id in schema after products table implemented
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  barcode: { type: String }
}, { versionKey: false });

const Items = mongoose.model("Items", itemsSchema, "Items");
const createItem = async (store_name, product_type, name, brand, category, price, barcode) => {

  // check that store exists
  // let store_value = get by name store store function

  // if it does not, create the store and save its ID
  // if (store_value === null) {
  //   // create a new store in database, use create function in stores-model
  // }

  // create new item object to save to database
  const item = new Items({
    store_id: store_name, 
    product_id: product_type,
    name: name,
    brand: brand,
    category: category,
    price: price,
    barcode: barcode
  });
  return item.save()
  .then(item => {
    // console.log('Entry saved successfully:', item);
    return item;
  })
  .catch(error => {
    console.error('Error saving entry:', error);
  })
};


const getItemByID = async (item_id) => {

  try {
    let this_item = await Items.findOne({ _id: item_id });
    // Handle the found item
    // console.log('Entry found successfully:', this_item);
    return this_item; // Return the found item
  } catch (error) {
    // Handle the error
    console.error('Error finding entry:', error);
    throw error; // Rethrow the error if needed
  }

};

module.exports = {
  createItem,
  getItemByID
};
