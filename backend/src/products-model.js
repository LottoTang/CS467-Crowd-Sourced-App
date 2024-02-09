
// require("dotenv").config();
// const { auth } = require("express-openid-connect");
const mongoose = require("mongoose");

// Connect to the Atlas cluster or local MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    brands: { type: List, required: true },
  }, { versionKey: false });


const Products = mongoose.model("Products", productsSchema, "Products");

const createProduct = async (name, brands) => {
    const product = new Products({
        name: name,
        brands: [],
    })
    return product.save()
    .then(product => {
      return product;
    })
    .catch(error => {
      console.error('Error saving entry:', error);
    })
}

const getproductByID = async (product_id) => {
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