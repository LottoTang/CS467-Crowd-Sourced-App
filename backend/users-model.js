// Course: CS467 - Capstone
// Topic: Crowded-Sourced Shopping App - Backend (Model)
// Author: Long To Lotto Tang
// Creation Date: 1/29/2024

require("dotenv").config();
const { auth } = require("express-openid-connect");
const mongoose = require("mongoose");

// Connect to the Atlas cluster or local MongoDB
mongoose.connect(process.env.MONGODB_CONNECT_STRING, { useNewUrlParser: true });
const db = mongoose.connection;

// Confirm that the database has connected
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose.");
});

// Create model

// Users - CRUD
const usersSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  shopping_list_id: { type: Array, required: true },
  email: { type: String, required: true },
  fullname: { type: String, required: true },
  username: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  shopping_level: { type: Number, required: true },
});

const Users = mongoose.model("Users", usersSchema, "Users");

const createUsers = async (auth_id, email, fullname, username, city, state) => {
  const users = new Users({
    user_id: auth_id,
    shopping_list_id: [],
    email: email,
    fullname: fullname,
    username: username,
    city: city,
    state: state,
    shopping_level: 1,
  });
  return users.save();
};

const findUserById = async (_id) => {
  const query = await Users.findbyId(_id);
  return query.exec();
};

const updateUser = async (filter, update) => {
  const result = await Users.updateOne(filter, update);
  return result.modifiedCount;
};

module.exports = {
  createUsers,
  findUserById,
  updateUser,
};
