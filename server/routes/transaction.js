import express from "express";
import {
  transferFund,
  history,
  fundUserBalance,
} from "../controllers/transaction.js";
import { verifyUser } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/transfer", verifyUser, transferFund);
router.post("/fundaccount/:walletId", verifyUser, fundUserBalance);
router.get("/:walletId", /*verifyUser, */ history);


export default router;
