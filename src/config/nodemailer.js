const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');
const catchAsync = require('../utils/catchAsync');

exports.nodeMailer = catchAsync(async (user, subject, message) => {
  const mailgunAuth = {
    auth: {
      api_key: process.env.API_KEY,
      domain: 'dorewa.io',
    },
  };
  // const googleAuth = {
  //   service: 'gmail',
  //   host: 'smtp@gmail.com',
  //   port: 587,
  //   auth: {
  //     user: 'thasquirrie@gmail.com',
  //     password: '138712bigdad',
  //   },
  // };

  const transport = nodemailer.createTransport(mg(mailgunAuth));

  const mailOptions = {
    from: 'support@subsum.com',
    to: user,
    subject: subject,
    html: message,
  };

  // const mailOptions = {
  //   from: 'support@eaze.com',
  //   to: 'thasquirrie@gmail.com',
  //   subject: 'Testing',
  //   text: 'Welcome to this service'
  // }

  // Send the email
  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return error;
    } else {
      console.log(`Email sent: ${{ ...info }}`);
      console.log({ info });
    }
  });
});
