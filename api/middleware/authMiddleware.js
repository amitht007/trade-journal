import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import pool from "../config/db.js";
// Helper function to extract token
const getTokenFromRequest = (req) => {
  const token = req.cookies["__Secure-authToken"];
  // req.headers.authorization?.split(" ")[1];
  return token;
};

// Middleware to protect routes (JWT verification)
const protect = async (req, res, next) => {
  // Get token
  const token = getTokenFromRequest(req);
  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token!" });
  }

  try {
    // Verify token and decode it
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const email = decoded.email;
    // Fetch user data based on email
    const query = "SELECT * FROM users WHERE email = $1";
    const result = await pool.query(query, [email]);

    const user = result.rows[0]; // Get the user object from the database
    // Check if user exists
    if (!user) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found!" });
    }

    // Attach user to request object
    req.user = user;

    // Proceed to next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, invalid token!" });
  }
};

// Middleware to check for admin access
const isAdmin = (req, res, next) => {
  // Check if user is attached to the request and if they are admin
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({ message: "Access forbidden, admin rights required!" });
  }

  // Proceed to next middleware
  next();
};

// Middleware for checking user roles dynamically (flexible role verification)
const checkRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res
        .status(403)
        .json({ message: `Access forbidden, ${role} rights required!` });
    }
    next();
  };
};

export { protect, isAdmin, checkRole };
