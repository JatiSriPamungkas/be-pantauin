import { Router } from "express";
import { getUser, getUserById, getUserByEmail, getUserByRole } from "../controllers/users.js";

export const router = Router();

router.get("/", getUser);
router.get("/role", getUserByRole);
router.get("/:userID", getUserById);

router.post("/login", getUserByEmail);
