import express from "express";
import {
  login,
  register,
  postNote,
  getNote,
  getAllNotes,
} from "../controller/userController.js";

import { protect, isAdmin } from "../middleware/authMiddleware.js";
const router = express.Router();

//User Login/Register Routes
router.post("/login", login);
router.post("/register", register);

//User Notes Routes
router.post("/postNote", protect, postNote);
router.get("/getNote", getNote);

//User Notes Dashboard
router.get("/dashNote", getAllNotes);

export default router;
