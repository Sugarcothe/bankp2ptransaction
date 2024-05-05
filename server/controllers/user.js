import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validateRegister, validateLogin } from "../middleware/validator.js";

export const register = async (req, res, next) => {
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
  if (walletIdExist)
    return res.status(400).json({
      message: `${walletIdExist.walletId} already assigned, select another walletId`,
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
};

// LOGIN
export const login = async (req, res, next) => {
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

  const token = jwt.sign({ id: user._id }, process.env.JWT, {
    expiresIn: process.env.TOKEN_EXPIRESIN,
  });
  res
    .cookie("access_token", token, {
      httpOnly: true,
    })
    .status(200)
    .json({
      message: "Successfully logged in",
      user,
    });
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
