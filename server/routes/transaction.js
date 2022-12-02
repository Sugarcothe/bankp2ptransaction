const router = require("express").Router();
const transactionController = require("../controllers/transaction");
const auth = require("../middleware/verifyToken");

router.post("/transfer", auth, transactionController.transferFund);
router.post(
  "/completeTransfer",
  auth,
  transactionController.completeTransaction
);
router.put("/fundwallet", transactionController.fundWallet);
router.get("/:walletId", auth, transactionController.history);

module.exports = router;
