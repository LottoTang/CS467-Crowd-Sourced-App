// require("dotenv").config();
// const { auth } = require("express-openid-connect");
const mongoose = require('mongoose');

// Connect to the Atlas cluster or local MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_STRING, {useNewUrlParser: true});
const db = mongoose.connection;

// // Create model
// replace store_id in schema with { type: mongoose.Schema.Types.ObjectId, ref: 'Stores', required: true }, once stores is done

// Items - CRUD
const itemsSchema = new mongoose.Schema({
  store_id:  { type: mongoose.Schema.Types.ObjectId, required: true }, 
  // replace store_id in schema with { type: mongoose.Schema.Types.ObjectId, ref: 'Stores', required: true }, once stores is done
  product_tags: { type: [String], required: true },
  // replace with product_id in schema after products table implemented
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  barcode_id: { type: String, required: false },
  promotion_id: { type: mongoose.Schema.Types.ObjectId, required: false },
  username: {type: String, required: false},
  date: {type: Date, required: false},
}, { versionKey: false });


const Items = mongoose.model('Items', itemsSchema, 'Items');
const createItem = async (
  store_name,
  product_tags,
  name,
  brand,
  price,
  barcode_id,
  promotion_id,
  username,
  date,
) => {

  // create new item object to save to database
  const item = new Items({
    store_id: store_name,
    product_tags: product_tags,
    name: name,
    brand: brand,
    price: price,
    barcode_id: barcode_id,
    promotion_id: promotion_id,
    username: username,
    date: date,
  });
  return item
    .save()
    .then(item => {
      // console.log('Entry saved successfully:', item);
      return item;
    })
    .catch(error => {
      console.error('Error saving entry:', error);
    });
};
const getAllItems = async item_id => {
  try {
    let these_items = await Items.find();
    // Handle the found item
    // console.log('Entry found successfully:', this_item);
    return these_items; // Return the found item
  } catch (error) {
    // Handle the error
    console.error('Error finding entry:', error);
    throw error; // Rethrow the error if needed
  }
};


const getItemByID = async item_id => {
  try {
    let this_item = await Items.findOne({_id: item_id});
    return this_item; // Return the found item
  } catch (error) {
    // Handle the error
    console.error('Error finding entry:', error);
    throw error; // Rethrow the error if needed
  }
};

const getItemByBarcode = async (barcode_id, store_id) => {
  try {
    let found_items = await Items.find({barcode_id: barcode_id});
    let found_item = null;
    for (let i = 0; i < found_items.length; i++) {
      if (found_items[i].store_id == store_id || store_id == "any") {
        found_item = found_items[i]
      }
    }
    return found_item; // Return the found item
  } catch (error) {
    // Handle the error
    console.error('Error finding entry:', error);
    throw error; // Rethrow the error if needed
  }
};


const getItemsByTag = async tag => {
  // PRODUCT_TAGS WILL BE LIST OF STRINGS
  try {
    let all_items = await Items.find();
    let tagged_items = []; // all items that have the user provided tag
    for (let i = 0; i < all_items.length; i++) {
      for (let j = 0; j < all_items[i].product_tags.length; j++) {
        // if the query string parameter = a value in the product_tags list, add that entire item to the sublist
        if (tag == all_items[i].product_tags[j]) {
          tagged_items.push(all_items[i]);
        }
      }
    }
    return tagged_items; // Return the found items
  } catch (error) {
    // Handle the error
    console.error('Error finding entry:', error);
    throw error;
  }
};

const updateItem = async (
  item_id,
  new_price,
  new_promotion,
  new_tags,
  user,
  date,
  price_change,
  promotion_change,
  tag_change
) => {
  if (price_change === true) {
    await Items.updateOne({_id: item_id}, {$set: {price: new_price, username: user, date: date}});
  }
  if (promotion_change === true) {
    // will be query once promotion table in place
    await Items.updateOne(
      {_id: item_id},
      {$set: {promotion_id: new_promotion, username: user, date: date}},
    );
  }
  if (tag_change === true) {
    // will be query once promotion table in place
    let this_item = await Items.findOne({_id: item_id})
    for (const tag of new_tags) this_item.product_tags.push(tag);

    await Items.updateOne(
      {_id: item_id},
      {$set: {product_tags: this_item.product_tags, username: user, date: date}},
    );
  }
};

module.exports = {
  Items,
  createItem,
  getItemByID,
  updateItem,
  getItemsByTag,
  getItemByBarcode,
  getAllItems
};
