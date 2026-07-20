import express from "express";
import { authorizeRoles } from "../middleware/role.js";
import { isAuthenticated } from "../middleware/auth.js";
import { login, register } from "../controllers/auth.js";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/crud.js";
import { validateLogin, validateRegister, validateCreateUser } from "../middleware/validate.js";

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/register", validateRegister, register);
router.post("/createuser", isAuthenticated, authorizeRoles("user"), validateCreateUser, createUser);
router.get("/getallusers", isAuthenticated, getAllUsers);
router.get("/getuserbyid/:id", isAuthenticated, getUserById);
router.put("/updateuser/:id", isAuthenticated, updateUser);
router.delete("/deleteuser/:id", isAuthenticated, deleteUser);

export default router;  