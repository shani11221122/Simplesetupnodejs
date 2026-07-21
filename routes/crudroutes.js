import express from "express";
import { authorizeRoles } from "../middleware/role.js";
import { isAuthenticated } from "../middleware/auth.js";
import { login, register } from "../controllers/auth.js";
//import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/crud.js";
import { validateLogin, validateRegister } from "../middleware/validate.js";
import { createPost, getAllPosts, getPostById, updatePost, deletePost } from "../controllers/contoller.post.js";
import { createComment, getCommentsForPost, deleteComment } from "../controllers/contoller.comment.js";
import { validatePost, validateComment } from "../middleware/validate.js";


const router = express.Router();
//login and register point
router.post("/login", validateLogin, login);
router.post("/register", validateRegister, register);

//post point
router.post("/createpost", isAuthenticated, authorizeRoles("admin"), validatePost, createPost);
router.get("/getallposts", isAuthenticated, getAllPosts);
router.get("/getpostbyid/:id", isAuthenticated, getPostById);
router.put("/updatepost/:id", isAuthenticated,validatePost, updatePost);
router.delete("/deletepost/:id", isAuthenticated, deletePost);

//comment point
router.post("/createcomment", isAuthenticated, authorizeRoles("admin"), validateComment, createComment);
router.get("/getcommentsforpost/:postId", isAuthenticated, getCommentsForPost);
router.delete("/deletecomment/:commentId", isAuthenticated, deleteComment);
/*
router.post("/createuser", isAuthenticated, authorizeRoles("user"), validateCreateUser, createUser);
router.get("/getallusers", isAuthenticated, getAllUsers);
router.get("/getuserbyid/:id", isAuthenticated, getUserById);
router.put("/updateuser/:id", isAuthenticated, updateUser);
router.delete("/deleteuser/:id", isAuthenticated, deleteUser);*/


export default router;  