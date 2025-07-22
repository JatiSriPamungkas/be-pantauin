import { Router } from "express";
import { getUser, getUserById, getUserByEmail } from "../controllers/users.js";

export const router = Router();

router.get("/", getUser);
router.get("/:userID", getUserById);

router.post("/login", getUserByEmail);
