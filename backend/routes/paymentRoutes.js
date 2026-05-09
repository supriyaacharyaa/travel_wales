import express from "express";
import { bankPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/bank", bankPayment);

export default router;