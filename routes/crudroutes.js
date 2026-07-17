import express from "express";
import { createuser, getallusers, getuserbyid, updateuser, deleteuser } from "../controllers/crud.js";

const router = express.Router();

router.post("/createuser", createuser);
router.get("/getallusers", getallusers);
router.get("/getuserbyid/:id", getuserbyid);
router.put("/updateuser/:id", updateuser);
router.delete("/deleteuser/:id", deleteuser);

export default router;  