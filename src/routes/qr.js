import { Router } from "express";
import { generateQRCode, getValidQRCode } from "../controllers/qr.js";

export const router = Router();

router.get("/", getValidQRCode);

router.post("/", generateQRCode);
