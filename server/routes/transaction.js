const router = require("express").Router();
const transactionController = require("../controllers/transaction");
const auth = require("../middleware/verifyToken");

router.post("/transfer", transactionController.transferFund);
router.post("/completeTransfer", transactionController.completeTransaction);
router.get("/:walletId", auth, transactionController.history);

module.exports = router;
