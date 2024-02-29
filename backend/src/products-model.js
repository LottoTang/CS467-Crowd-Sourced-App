
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

const getProductByName = async (name) => {
    try {
        let this_product = await Products.findOne({ name: name });
        return this_product; 
      } catch (error) {
        console.error('Error finding entry:', error);
        throw error; 
      }
}

const getBrandsOfProduct = async (name) => {
  try {
      let this_product = await Products.findOne({ name: name });
      return this_product.brands; 
    } catch (error) {
      console.error('Error finding entry:', error);
      throw error; 
    }
}

const getProductBySubstring = async (name) => {
  const productNames = [];
  try {
      let this_product = await Products.find({ name: {$regex: name} });
      const productNames = this_product.map(product => product.name);
      return productNames; 
    } catch (error) {
      console.error('Error finding entry:', error);
      throw error; 
    }
}

module.exports = {
    Products,
    createProduct,
    getProductByName,
    getBrandsOfProduct,
    getProductBySubstring
}