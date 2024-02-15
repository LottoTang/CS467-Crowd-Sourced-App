
// require("dotenv").config();
// const { auth } = require("express-openid-connect");
const mongoose = require("mongoose");

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
    console.log(promotion_type)
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

    for (let i = 0; i < Items.length; i++) {

    }
    let deleted_promotion = await Promotions.deleteOne({ _id: promotion_id });

    } catch (error) {
      console.error('Error finding entry:', error);
      throw error; 
    }
}

module.exports = {
    createPromotion,
    getPromotionByID,
    deletePromotion
}