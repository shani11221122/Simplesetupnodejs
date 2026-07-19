import express from "express";
import { authorizeRoles } from "../middleware/role.js";
import { isAuthenticated } from "../middleware/auth.js";
import { login, register } from "../controllers/auth.js";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/crud.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/createuser", isAuthenticated, authorizeRoles("user"), createUser);
router.get("/getallusers", isAuthenticated, getAllUsers);
router.get("/getuserbyid/:id", isAuthenticated, getUserById);
router.put("/updateuser/:id", isAuthenticated, authorizeRoles("admin"), updateUser);
router.delete("/deleteuser/:id", isAuthenticated, authorizeRoles("admin"), deleteUser);

export default router;  