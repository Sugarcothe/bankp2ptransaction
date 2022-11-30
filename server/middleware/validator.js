const Joi = require("@hapi/joi");

const validateRegister = data => {
  const schema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .email()
      .min(6)
      .max(255)
      .required(),
    phoneNumber: Joi.string()
      .regex(/^[0-9 +]+$/)
      .min(11)
      .max(11)
      .required(),
    walletId: Joi.string()
      .min(12)
      .max(12)
      .required(),
    pin: Joi.string()
      .min(4)
      .max(4)
      .required(),
    password: Joi.string()
      .min(6)
      .max(12)
      .required()
  };

  return Joi.validate(data, schema);
};

const validateLogin = data => {
  const schema = {
    walletId: Joi.string()
      .min(12)
      .max(12)
      .required(),
    password: Joi.string()
      .min(6)
      .max(12)
      .required()
  };

  return Joi.validate(data, schema);
};

module.exports = {
  validateRegister,
  validateLogin
};
