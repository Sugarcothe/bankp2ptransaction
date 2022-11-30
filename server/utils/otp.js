const africastalking = require("africastalking");
const config = require("../config/index");
const User = require("../models/user");

//Random number generator
const getRandomArbitrary = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

module.exports = {
  sendOtp: async userDetails => {
    const otp = getRandomArbitrary(100000, 999999);

    const AfricasTalking = new africastalking(
      {
        apiKey: config.AFRICAS_TALKING_KEY,
        username: config.AFRICAS_TALKING_USERNAME
      },
      { debug: true }
    );

    const sms = AfricasTalking.SMS;

    // Use the service
    const options = {
      to: [`${userDetails.phoneNumber}`],
      message: `Please use the OTP code: ${otp} to complete your transaction`
    };

    // Send message and capture the response or error
    await sms.send(options);

    //update user token
    await User.findOneAndUpdate({ walletId: userDetails.walletId }, { otp });
  }
};
