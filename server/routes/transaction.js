const router = require("express").Router();
const transactionController = require("../controllers/transaction");
const auth = require("../middleware/verifyToken");

router.post("/transfer", auth, transactionController.transferFund);
router.post(
  "/completeTransfer",
  auth,
  transactionController.completeTransaction
);
router.get("/:walletId", auth, transactionController.history);

module.exports = router;
