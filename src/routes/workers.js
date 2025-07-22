import { Router } from "express";
import { getWorker } from "../controllers/workers.js";

export const router = Router();

router.get("/", getWorker);