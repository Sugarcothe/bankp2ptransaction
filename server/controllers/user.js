const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomize = require("randomatic");
const { validateRegister, validateLogin } = require("../middleware/validator");
const config = require("../config/index");

module.exports = {
  register: async (req, res, next) => {
    const { name, email, phoneNumber, password, pin, walletId } = req.body;

    //validate user request
    const { error } = validateRegister(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    // If number already exist
    const phoneExist = await User.findOne({ phoneNumber });
    if (phoneExist)
      return res.status(400).json({
        message: `${phoneExist.phoneNumber} already registered, Please login`,
      });

    const emailExist = await User.findOne({ email });
    if (emailExist)
      return res.status(400).json({
        message: `${emailExist.email} already registered, Please login`,
      });

    //     //check if the user already exist
    const walletIdExist = await User.findOne({ walletId });
    if (walletId)
      return res
        .status(400)
        .json({
          message:
            `${walletIdExist.walletId} as Wallet Id already registered, select another walletId`,
        });

    //salt and hash pin and password
    const salt = await bcrypt.genSalt(10);
    const hashedPin = await bcrypt.hash(pin, salt);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      //create a new User and save
      const newUser = await User.create({
        walletId,
        name,
        email,
        phoneNumber,
        pin: hashedPin,
        password: hashedPassword,
      });

      // try {
      //send mail to the user containing walletId and pin for login
      const userDetails = { name, walletId, pin, email };

      res.status(201).json({
        message: "Your Accounted is created",
        userDetails,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error while creating account: ${err}` });
    }
  },

  // login

  login: async (req, res, next) => {
    const { walletId, password } = req.body;

    //validate user request
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    //check if user exist
    const user = await User.findOne({ walletId });
    if (!user) return res.status(400).json({ message: "Invalid walletId" });

    //compare the password with that in the db
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    //sign a JWT token

    const token = jwt.sign(
      { id: user._id, name: user.name },
      config.JWT_SECRET,
      { expiresIn: config.TOKEN_EXPIRESIN }
    );

    res
      .header("auth-token", token)
      .status(200)
      .json({
        message: "Successfully logged in",
        user: { id: user._id, name: user.name },
      });
  },
};
