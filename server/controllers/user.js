const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const randomize = require("randomatic");
const { validateRegister, validateLogin } = require("../middleware/validator");
const mailService = require("../services/emailService");
const config = require("../config/index");

module.exports = {
  register: async (req, res, next) => {
    const { name, email, phoneNumber, password } = req.body;
    const walletId = randomize("0A", 12);
    const pin = randomize("A0", 4);

    //append walletId and pin to req.body
    req.body.walletId = walletId;
    req.body.pin = pin;

    //validate user request
    const { error } = validateRegister(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    //     //check if the user already exist
    const userExist = await User.findOne({ walletId });
    if (userExist)
      return res
        .status(400)
        .json({ message: "User already register, please login" });

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
        password: hashedPassword
      });

      // try {
      //send mail to the user containing walletId and pin for login
      const userDetails = { name, walletId, pin, email };
      mailService.accountCreationMail(userDetails);

      res.status(201).json({
        message: "new user created",
        user: { id: newUser._id, name: newUser.name }
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: `Error while creating account: ${err}` });
    }
  },

  login: async (req, res, next) => {
    const { walletId, password } = req.body;

    //validate user request
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    //check if user exist
    const user = await User.findOne({ walletId });
    if (!user)
      return res.status(400).json({ message: "Invalid walletId or password" });

    //compare the password with that in the db
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid walletId or password" });

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
        user: { id: user._id, name: user.name }
      });
  }
};
