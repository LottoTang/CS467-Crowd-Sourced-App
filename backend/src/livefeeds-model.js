const mongoose = require('mongoose');

// Connect to the Atlas cluster or local MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_STRING, {useNewUrlParser: true});
const db = mongoose.connection;

// // Create model
// replace store_id in schema with { type: mongoose.Schema.Types.ObjectId, ref: 'Stores', required: true }, once stores is done

// Livefeeds - CRUD
const livefeedsSchema = new mongoose.Schema({
  item_id:  { type: mongoose.Schema.Types.ObjectId, required: false }, 
  // replace store_id in schema with { type: mongoose.Schema.Types.ObjectId, ref: 'Stores', required: true }, once stores is done
  store_id: { type: mongoose.Schema.Types.ObjectId, required: false },
  // replace with product_id in schema after products table implemented
  review: { type: String, required: true },
}, { versionKey: false });

const Livefeeds = mongoose.model('LiveFeeds', livefeedsSchema, 'LiveFeeds');


const createLivefeed = async (
  item_id,
  store_id,
  review
) => {
  // create new livefeed object to save to database
  const livefeed = new Livefeeds({
    item_id: item_id,
    store_id: store_id,
    review: review
  });
  return livefeed
    .save()
    .then(livefeed => {
      return livefeed;
    })
    .catch(error => {
      console.error('Error saving entry:', error);
    });
};

const getLivefeedsByID = async livefeed_id => {
    try {
      let this_livefeed = await Livefeeds.findOne({_id: livefeed_id});
      return this_livefeed; 
    } catch (error) {
      console.error('Error finding entry:', error);
      throw error; // Rethrow the error if needed
    }
  };

const getAllLivefeeds = async livefeed_id => {
    try {
      let this_livefeed = await Livefeeds.findOne({_id: livefeed_id});
      return this_livefeed; 
    } catch (error) {
      console.error('Error finding entry:', error);
      throw error; // Rethrow the error if needed
    }
  };

module.exports = {
    createLivefeed,
    getLivefeedsByID
};