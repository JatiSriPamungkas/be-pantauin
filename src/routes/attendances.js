import { Router } from "express";
import { createPresensi } from "../controllers/attendances.js";

export const router = Router();

router.post("/", createPresensi);
