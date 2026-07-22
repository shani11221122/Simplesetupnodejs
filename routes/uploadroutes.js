import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { uploadProfileImage } from "../controllers/upload.js";

const router = express.Router();

router.post("/profile", isAuthenticated, upload.single("profileImage"), uploadProfileImage);

export default router;