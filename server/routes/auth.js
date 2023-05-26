import express from "express";
import { login, register } from "../controllers/user.js";
import { getUser } from "../controllers/user.js";
import { getUsers } from "../controllers/user.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", getUser);
router.get("/users", getUsers);

export default router;
