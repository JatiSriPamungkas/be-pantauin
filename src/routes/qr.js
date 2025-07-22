import { Router } from "express";
import { createPresensi } from "../controllers/qr.js";

export const router = Router();

router.post("/", createPresensi);
