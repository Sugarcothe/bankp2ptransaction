import express from "express";
import {
  transferFund,
  completeTransaction,
  history,
} from "../controllers/transaction.js";
import { verifyUser } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/transfer", verifyUser, transferFund);
router.post("/completeTransfer", verifyUser, completeTransaction);
router.get("/:walletId", verifyUser, history);

export default router;