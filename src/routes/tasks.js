import { Router } from "express";
import { getTask } from "../controllers/tasks.js";

export const router = Router();

router.get("/", getTask);
