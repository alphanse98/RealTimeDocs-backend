const User = require("../models/usersModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
// const JWT_SECRET = crypto.randomBytes(32).toString("hex");
const JWT_SECRET = "c17ec58f4786001f9577140040151fe3615da8a80622196c858c658685035d97";

exports.userRegister = async (req, res) => {

  try {
    const { email, password } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ email, password: hashedPassword });
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

exports.userLogin = async (req, res) => {

    try {
      const { email, password } = req.body;
      console.log("userLogin >>>>> ", email, password);
  
      // Find user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("User found: ", user);
  
      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      console.log("Password is valid");
  
      // Generate JWT
      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: "1h",
      });
  
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      console.error("Error during login: ", error);
      res.status(500).json({ message: "Internal server error", error });
    }
  };
  

