// Course: CS467 - Capstone
// Topic: Crowded-Sourced Shopping App - Backend (Controller)
// Author: Long To Lotto Tang
// Creation Date: 1/29/2024

require("dotenv").config();
const express = require("express");
const session = require("express-session");
const axios = require("axios");
const db = require("./app-model.js");
const app = express();

const user = express.Router();
app.use("/user", user);

const PORT = process.env.PORT || 3000;

// Utility Functions
const stringGenerator = (num) => {
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  let charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Middleware
const authChecker = (req, res, next) => {
  if (req.session.isLoggedIn) {
    next();
  } else {
    console.log("Not Authenticated");
    return res.redirect("/user");
  }
};

const options = {
  secret: stringGenerator(20),
  name: "isLoggedIn",
  saveUninitialized: false,
  resave: true,
};

user.use(session(options));

user.get("/", (req, res) => {
  if (req.session.isLoggedIn) {
    res.send("You are logged in!");
  } else {
    res.send("You are not logged in!");
  }
});

user.get("/login", (req, res) => {
  const state = stringGenerator(20);
  const scope = "openid%20profile%20email";
  const loginURL = `https://cs467-crowd-sourced-app.us.auth0.com/authorize?response_type=code&client_id=${process.env.CLIENT_ID}&redirect_uri=http://localhost:3000/user/auth-token&scope=${scope}&state=${state}`;
  res.redirect(loginURL);
});

user.get("/auth-token", async (req, res) => {
  const authCode = req.query.code;
  const options = {
    method: "POST",
    url: "https://cs467-crowd-sourced-app.us.auth0.com/oauth/token",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    data: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.SECRET,
      code: authCode,
      redirect_uri: "http://localhost:3000/user/auth-token",
    }),
  };
  try {
    const query = await axios.request(options);
    if (query) {
      req.session.isLoggedIn = true;
      res.redirect("/user");
    }
  } catch (err) {
    console.log("Error:", err);
  }
});

user.get("/logout", authChecker, (req, res) => {
  req.session.destroy(() => {
    console.log("Session destroyed!");
    res.redirect("/user");
  });
});

// user.get("/checker", requiresAuth(), async (req, res) => {
//   const userInfo = req.oidc.user;
//   const claims = await auth.getIdTokenClaims();
//   console.log(claims);
//   try {
//     const query = await db.findUserByAuthId(userInfo.sub);
//     // Register in MongoDB if new user
//     if (!query) {
//       // *** Should redirect to a intermediate page for entering fullname...
//       res.redirect("/user/register");
//     } else {
//       res.redirect("/user/profile");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// });

// user.get("/register", requiresAuth(), async (req, res) => {
//   const userInfo = req.oidc.user;
//   const fullname = "James Jones";
//   const username = "shoppingpro123";
//   const city = "Los Angeles";
//   const state = "CA";
//   try {
//     const user = await db.createUsers(
//       userInfo.sub,
//       userInfo.email,
//       fullname,
//       username,
//       city,
//       state
//     );
//     console.log("User successfully created!");
//     res.redirect("/user/profile");
//   } catch (error) {
//     console.error("Error:", error);
//   }
// });

// user.get("/update", requiresAuth(), async (req, res) => {
//   const userInfo = req.oidc.user;
//   try {
//     const query = await db.findUserByAuthId(userInfo.sub);
//     if (query) {
//       const update = {};
//       if (req.body.fullname !== undefined) update.fullname = req.query.fullname;
//       if (req.body.username !== undefined) update.username = req.query.username;
//       if (req.body.city !== undefined) update.city = req.query.city;
//       if (req.body.state !== undefined) update.state = req.query.state;
//       const updateUser = await query.updateUser(
//         { user_id: userInfo.sub },
//         update
//       );
//       res.send({ updateCount: updateCount });
//     }
//   } catch (error) {
//     console.error("Error:", error);
//   }
// });

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
