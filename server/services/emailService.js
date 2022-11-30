const nodemailer = require("nodemailer");
const sgTransport = require("nodemailer-sendgrid-transport");
const config = require("../config/index");
module.exports = {
  accountCreationMail: async user => {
    const options = {
      auth: {
        api_user: config.SENDGRID_USER,
        api_key: config.SENDGRID_PASSWORD
      }
    };
    const mailer = nodemailer.createTransport(sgTransport(options));
    const mailOptions = {
      to: user.email,
      from: "no-reply@ajocard.com",
      subject: "Your Account has been successfully created",
      text: `Hello ${
        user.name
      },\n\nHere is your AjoCard credentials, please keep them safe.\n\n
            Wallet Id: ${user.walletId} \n
            Pin: ${user.pin}
            `
    };
    await mailer.sendMail(mailOptions, (err, response) => {
      if (err) {
        return err;
      } else {
        return response;
      }
    });
  }
};
