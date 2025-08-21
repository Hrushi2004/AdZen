// server.js

const express = require("express");
const mongoose = require("mongoose");
const userModel = require("./Userschema.js");
const bodyparser = require('body-parser');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Hrushikesh:Hemakumari9@cluster0.lp4reap.mongodb.net/SDP?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});
app.get("/user-data", async (req, res) => {
  try {
    // Assume you have a middleware to verify the user's authentication before reaching this point
    const loggedInUserEmail = req.headers['x-user-email']; // Assuming you have a header with user email

    // Retrieve user data from the database based on the logged-in user's email
    const user = await userModel.findOne({ email: loggedInUserEmail });

    if (user) {
      // Send only necessary data to the client to avoid exposing sensitive information
      const userData = {
        email: user.email,
        name: `${user.fname} ${user.lname}`,
        // Add more fields as needed
      };

      res.json(userData);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log("Error in user data route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/update-user-data", async (req, res) => {
  try {
    // Assume you have a middleware to verify the user's authentication before reaching this point

    const { email, additionalInfo } = req.body;

    // Find the user based on the email
    const user = await userModel.findOne({ email });

    if (user) {
      // Update the user's additional information
      user.age = additionalInfo.age;
      user.address = additionalInfo.address;
      // Add more fields as needed

      // Save the updated user data
      const updatedUser = await user.save();

      // Send only necessary data to the client to avoid exposing sensitive information
      const userData = {
        email: updatedUser.email,
        name: `${updatedUser.fname} ${updatedUser.lname}`,
        // Add more fields as needed
      };

      res.json(userData);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log("Error in update user data route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const check = await userModel.findOne({ email: req.body.email });

    if (check) {
      if (req.body.password === check.password) {
        console.log("Correct password");
        res.json({ success: true, message: "Login successful" });
      } else {
        res.status(400).json({ error: "Incorrect Password" });
      }
    } else {
      res.status(401).json({ error: "User doesn't exist" });
    }
  } catch (error) {
    console.log("Error in login route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.post("/change-password", async (req, res) => {
  try {
    const { email, password, newPassword } = req.body;

    // Find the user based on the email
    const user = await userModel.findOne({ email });

    if (user) {
      // Check if the provided current password is correct
      if (password === user.password) {
        // Update the user's password with the new one
        user.password = newPassword;

        // Save the updated user data
        await user.save();

        res.json({ success: true, message: "Password changed successfully" });
      } else {
        res.status(401).json({ error: "Incorrect current password" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.log("Error in change password route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// Register route
app.post("/register", async (req, res) => {
  try {
    const user = new userModel(req.body);
    let result = await user.save();
    result = result.toObject();

    if (result) {
      delete result.password;
      res.json(result);
      console.log(result);
    } else {
      console.log("User already registered");
    }
  } catch (error) {
    console.log("Error in register route:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
