import bcrypt from "bcrypt";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../config.env" });
import generateToken from "../utils/generateToken.js";

//Register User
// @desc     Register user
// @route    POST/api/global/register
// @access   Private-[staff,teacher,student]
const register = async (req, res) => {
  const { role, username, password, email, date_created } = req.body;
  if (!username || !password || !email) {
    return res.status(400).json({ message: "Invalid Credentials!" });
  }
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(today.getDate()).padStart(2, "0");
  const currentDate = `${day}-${month}-${year}`;
  try {
    // Check if email already exists
    const result = await pool.query(
      "SELECT email FROM users WHERE email = $1",
      [email]
    );
    if (result.rowCount > 0) {
      return res.status(401).json({ message: "Email Already Exists" });
    }

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert common user data into 'users' table
    const insertUserQuery = `
      INSERT INTO users (role, username, password, date_created, email)
      VALUES ($1, $2, $3, $4, $5) RETURNING user_id;
    `;

    const userResult = await pool.query(insertUserQuery, [
      role ? "admin" : "user",
      username,
      hashedPassword,
      date_created ? date_created : currentDate,
      email,
    ]);

    res.status(200).json({ message: "Successfully Registered", userResult });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc     Login user
// @route    POST/api/user/login
// @access   Public
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }

  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);

    // Check if user exists
    if (result.rowCount === 0) {
      console.log("User not found");
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const user = result.rows[0]; // Get the user object from the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Incorrect password");
      return res.status(401).json({ message: "Invalid email or password." });
    }
    console.log(user);
    const token = generateToken(user);
    res.cookie("__Secure-authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development", // Use 'secure' in production (HTTPS)
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    console.log("User has logged in successfully");

    // Respond with essential user data (excluding sensitive information)
    res.status(200).json({
      id: user.user_id,
      username: user.username,
      role: user.au_id, // Ensure 'role' comes from a proper source (e.g., user.role)
      email: user.email,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logged Out!" });
};

// @desc     Add time to database
// @route    POST/api/user/addTime
// @access   Private
const addTime = async (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not Authenticated, no token" });
  }
  const decoded = jwt.verify(token, "@abc123");
  const user = await User.findById(decoded.userId).select("-password");
  const { timeMap } = req.body;
  const timeMapData = user.data;

  // Generate the current date as a string key
  const dateKey = new Date().toLocaleDateString("en-IN");
  const timeData = {
    [`${dateKey}`]: timeMap.current,
  };

  timeMapData.set(dateKey, timeMap.current);

  try {
    const result = await User.updateOne(
      { _id: user.id },
      { $set: { data: timeMapData } }
    );
    if (result.matchedCount > 0) {
      console.log("Time Added Successfully!");
      res.status(200).json({ message: "Time added successfully" });
    } else {
      console.log(" Didn'g Get Add!");

      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ message: "Error updating user data", error });
  }
};

//Get All Note
// @desc     Get All Note
// @route    Post/api/getNotes/
// @access   private
const getAllNotes = async (req, res) => {
  try {
    // Extract the query parameters to determine which data to include
    const { includeStaff, includeTeacher, includeStudent } = req.query;

    // Pass the extracted parameters to the dynamic query function
    const data = await getDynamicQuery({
      includeStaff: includeStaff === "true",
      includeTeacher: includeTeacher === "true",
      includeStudent: includeStudent === "true",
    });

    // Send the data as a JSON response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getDynamicData controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//Get Note
// @desc     Post Note
// @route    Post/api/getNote/
// @access   private
const getNote = async (req, res) => {
  try {
    // Extract the query parameters to determine which data to include
    const { includeStaff, includeTeacher, includeStudent } = req.query;

    // Pass the extracted parameters to the dynamic query function
    const data = await getDynamicQuery({
      includeStaff: includeStaff === "true",
      includeTeacher: includeTeacher === "true",
      includeStudent: includeStudent === "true",
    });

    // Send the data as a JSON response
    res.status(200).json(data);
  } catch (error) {
    console.error("Error in getDynamicData controller:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//Get Note
// @desc     Post Note
// @route    Post/api/getNote/
// @access   private
const postNote = async (req, res) => {
  try {
    // Extract journal note content from request body
    const { content, pnl } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Journal content is required" });
    }

    // Get user_id from the req.user object (set by protect middleware)
    const userId = req.user.user_id;
    console.log(userId);
    // Insert journal note into the PostgreSQL database
    const query = `
      INSERT INTO notes (user_id, note, date_created,pnl)
      VALUES ($1, $2, NOW(),$3)
      RETURNING *;
    `;
    const result = await pool.query(query, [userId, content, pnl]);

    // Respond with the created journal note
    const newJournal = result.rows[0];
    res.status(201).json({
      message: "Journal created successfully",
      journal: newJournal,
    });
  } catch (error) {
    console.error("Error posting journal note:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export { register, login, getNote, postNote, getAllNotes };
