
// require("dotenv").config();
// const { auth } = require("express-openid-connect");
const mongoose = require("mongoose");
const {Items} = require("./items-model.js");

// Connect to the Atlas cluster or local MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

const promotionsSchema = new mongoose.Schema({
    promotion_type: { type: String, required: true },
    start_time: { type: Date, required: false },
    end_time: { type: Date, required: false }
  }, { versionKey: false });


const Promotions = mongoose.model("Promotions", promotionsSchema, "Promotions");

const createPromotion = async (promotion_type, start_time, end_time) => {
    const promotion = new Promotions({
        promotion_type: promotion_type,
        start_time: start_time,
        end_time: end_time
    })
    return promotion.save()
    .then(promotion => {
      return promotion;
    })
    .catch(error => {
      console.error('Error saving entry:', error);
    })
}

const getAllPromotions = async () => {
  try {
      let found_promotions = await Promotions.find();
      return found_promotions; 
    } catch (error) {
      console.error('Error finding entry:', error);
      throw error; 
    }
}

const getPromotionByID = async (promotion_id) => {
    try {
        let this_promotion = await Promotions.findOne({ _id: promotion_id });
        return this_promotion; 
      } catch (error) {
        console.error('Error finding entry:', error);
        throw error; 
      }
}

const deletePromotion = async (promotion_id) => {
  try {
    // find an item with this promotion and set promotion to null
    let this_promotion = await Promotions.findOne({ _id: promotion_id });
    itemsToRemovePromotionFrom = await Items.find({promotion_id: promotion_id});
    for (let i = 0; i < itemsToRemovePromotionFrom.length; i++) {
      let value = await Items.findByIdAndUpdate(
        itemsToRemovePromotionFrom[i]._id,
        {promotion_id: null},
        { new: true }
      )
    }
    let deleted_promotion = await Promotions.deleteOne({ _id: promotion_id });

    } catch (error) {
      console.error('Error finding entry:', error);
      throw error; 
    }
}

const updatePromotion = async (promotion_id, promotion_type, start_time, end_time, name_change, start_change, end_change) => {
  if (name_change === true) {
    await Promotions.updateOne({ _id: promotion_id}, {"$set": {"promotion_type": promotion_type}} );
  }
  if (start_change === true) {
    await Promotions.updateOne({ _id: promotion_id}, {"$set": {"start_time": start_time}} );
  }
    if (end_change === true) {
    await Promotions.updateOne({ _id: promotion_id}, {"$set": {"end_time": end_time}} );
  }
}

const getPromotionBySubstring = async (promotion_type) => {
  const promotionNames = [];
  try {
      let this_promotion = await Promotions.find({ promotion_type: {$regex: promotion_type} });
      const promotionNames = this_promotion.map(promotion => promotion.promotion_type);
      return promotionNames; 
    } catch (error) {
      console.error('Error finding entry:', error);
      throw error; 
    }
}

module.exports = {
    Promotions,
    createPromotion,
    getPromotionByID,
    deletePromotion,
    updatePromotion,
    getPromotionBySubstring,
    getAllPromotions
}