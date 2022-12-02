const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Transaction = require("../models/transaction");

module.exports = {
  transferFund: async (req, res, next) => {
    const senderId = req.body.sender_walletId;
    const receiverId = req.body.receiver_walletId;
    let amount = req.body.amount;

    if (senderId === receiverId)
      return res
        .status(400)
        .json({ message: "Cannot transfer to same account" });

    //verify that the the ids exist
    const sender = await User.findOne({ walletId: senderId });
    const receiver = await User.findOne({ walletId: receiverId });

    if (!sender || !receiver)
      return res.status(400).json({ message: "Invalid sender or receiver Id" });

    //ensure sender has enough balance to make this transaction
    let senderBalance = sender.balance;
    if (senderBalance >= amount) {
      //save the unfulfilled transaction to transaction table
      const transactionDetails = await Transaction.create({
        sender_walletId: senderId,
        receiver_walletId: receiverId,
        amount,
      });

      res.status(200).json({
        message: transactionDetails,
      });
    } else {
      res.status(400).json({
        message: "You don't have enough funds to complete this transaction",
      });
    }
  },

  completeTransaction: async (req, res, next) => {
    const transId = req.body;

    // get amount transacted
    const transaction = await Transaction.findById(transId);

    const sender = await User.findOne({
      accountNumber: transaction.sender_acctNumber,
    });
    const receiver = await User.findOne({
      accountNumber: transaction.receiver_acctNumber,
    });

    //  get sender and receiver balance
    let senderBalance = sender.balance;
    let receiverBalance = receiver.balance;

    // Checks the senders balance and send
    if (senderBalance >= amount) {
      senderBalance -= amount;
      receiverBalance += amount;

      await User.findOneAndUpdate(
        { accountNumber: transaction.sender_acctNumber },
        { balance: senderBalance }
      );
      await User.findOneAndUpdate(
        { accountNumber: transaction.receiver_acctNumber },
        { balance: receiverBalance }
      );
      await Transaction.findOneAndUpdate(
        { _id: transId },
        { status: "completed" }
      );

      res.status(200).json({
        message: "Fund transfer completed successfully!",
      });
    } else {
      res.status(400).json({
        message: "You don't have enough funds to complete this transaction",
      });
    }
  },

  fundWallet: async (req, res, next) => {
    try {
      await Users.findByIdAndUpdate(req.params.id, {
        $inc: req.body,
      });
      res.status(200).json(`🟢 Account funded Succesfully`);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  history: async (req, res, next) => {
    const { walletId } = req.params;
    const sent = await Transaction.find({ sender_walletId: walletId });
    const recieved = await Transaction.find({ receiver_walletId: walletId });
    const data = [...sent, ...recieved];

    res.status(200).json({ message: "Transaction history", data });
  },
};
