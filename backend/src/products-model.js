
// require("dotenv").config();
// const { auth } = require("express-openid-connect");
const mongoose = require("mongoose");

// Connect to the Atlas cluster or local MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brands: { type: [String], required: true },
  }, { versionKey: false });


const Products = mongoose.model("Products", productsSchema, "Products");

const createProduct = async (name, brands) => {
  try {
    // check if tag (name) for product already exists - returns a single document or null
    let existingDocument = await Products.findOne({ name: name });

    if (existingDocument !== null) {
      return 404; 
    }

    const product = new Products({
        name: name,
        brands: brands,
    })
    await product.save()
    return product;

  } catch (error) {
    console.error('Error finding entry:', error);
    throw error; 
  }
}

const getProductByID = async (product_id) => {
    try {
        let this_product = await Products.findOne({ _id: product_id });
        return this_product; 
      } catch (error) {
        console.error('Error finding entry:', error);
        throw error; 
      }
}

module.exports = {
    createProduct,
    getProductByID
}