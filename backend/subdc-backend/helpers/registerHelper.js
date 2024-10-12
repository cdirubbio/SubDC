////////////////\\\\\\\\\\\\\\\\\\
// Helper Methods for /api/register
////////////////\\\\\\\\\\\\\\\\\\
const db = require("../db");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});
const verifyStudentEmail = (email) => {
  // i think these are the things allowed in email addresses but idek
  const allwoedEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(edu)$/;
  return allwoedEmailPattern.test(email);
};

const checkUsernameNotExist = (username) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT user_id FROM Users WHERE username = ?";

    db.query(sql, [username], (err, result) => {
      if (err) {
        reject({ status: 500, message: err.message });
      } else if (result.length !== 0) {
        reject({ status: 409, message: "Username already exists" });
      } else {
        resolve(true);
      }
    });
  });
};

const checkEmailNotExist = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT user_id FROM Users WHERE email = ?";

    db.query(sql, [email], (err, result) => {
      if (err) {
        reject({ status: 500, message: err.message });
      } else if (result.length !== 0) {
        reject({ status: 409, message: "Email already exists" });
      } else {
        resolve(true);
      }
    });
  });
};

const sendVerificationEmail = async (email) => {
  const emailToken = jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  const verificationUrl = `${process.env.FRONTEND_URL}/verifyEmail?token=${emailToken}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "SubDC - Please Verify Your Email",
    html: `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    <div style="text-align: center; margin-bottom: 20px;">
      <img src="https://subdc-listing-images.s3.us-east-1.amazonaws.com/logo.jpg" alt="SubDC Logo" style="width: 150px; height: auto;">
    </div>
    <h2 style="color: #415a77; text-align: center;">Welcome to SubDC!</h2>
    <p style="font-size: 16px; color: #333;">Thank you for signing up for SubDC. To complete your registration, please verify your email address by clicking the button below:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${verificationUrl}" style="background-color: #415a77; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Verify Email</a>
    </div>
    <p style="font-size: 14px; color: #777;">Or copy and paste this link into your browser:</p>
    <p style="word-wrap: break-word; font-size: 14px; color: #555;">${verificationUrl}</p>
    <p style="font-size: 14px; color: #999; text-align: center;">If you did not sign up for SubDC, please ignore this email.</p>
    <footer style="margin-top: 30px; text-align: center; font-size: 12px; color: #999;">
      <p>SubDC Team</p>
      <p>Washington DC, USA</p>
    </footer>
  </div>
`,
  };
  await emailTransporter.sendMail(mailOptions);
};
module.exports = {
  checkUsernameNotExist,
  checkEmailNotExist,
  sendVerificationEmail,
  verifyStudentEmail,
};
