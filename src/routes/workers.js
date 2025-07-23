import { Router } from "express";
import { getAllWorker, getTotalWorker, getWorkerAndTask } from "../controllers/workers.js";

export const router = Router();

router.get("/", getTotalWorker);
router.get("/all", getAllWorker);
router.get("/tasks", getWorkerAndTask);
