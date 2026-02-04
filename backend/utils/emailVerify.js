import nodemailer from "nodemailer";
import crypto from "crypto";

const createTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  return transporter;
};

export const generateVerificationCode = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const sendVerificationEmail = async (email, username, verificationCode) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: `"TypeVenture" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Email Verification - TypeVenture",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Poppins', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: bold; color: #0029FF; }
            .code-box { background: linear-gradient(135deg, #0029FF, #000000, #FF1414); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .code { font-size: 32px; font-weight: bold; letter-spacing: 5px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🎮 TypeVenture</div>
              <h2>Email Verification</h2>
            </div>
            <p>Hello <strong>${username}</strong>,</p>
            <p>Thank you for registering with TypeVenture! Please use the verification code below to verify your email address:</p>
            <div class="code-box">
              <div class="code">${verificationCode}</div>
            </div>
            <p>This code will expire in <strong>15 minutes</strong>.</p>
            <p>If you didn't request this verification, please ignore this email.</p>
            <div class="footer">
              <p>© 2026 TypeVenture - Sharpen your design eye while having fun!</p>
              <p>Contact us: typeventureweb@gmail.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };
    await transporter.sendMail(mailOptions);
    console.log("✅ Verification email sent to:", email);
    return true;
  } catch (error) {
    console.error("❌ Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

export const sendVerificationSuccessEmail = async (email, username) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: `"TypeVenture" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Email Verified Successfully - TypeVenture",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Poppins', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: bold; color: #0029FF; }
            .success-icon { font-size: 48px; text-align: center; margin: 20px 0; }
            .button { display: inline-block; background: linear-gradient(135deg, #0029FF, #FF1414); color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🎮 TypeVenture</div>
              <h2>Email Verified Successfully!</h2>
            </div>
            <div class="success-icon">✅</div>
            <p>Congratulations <strong>${username}</strong>!</p>
            <p>Your email has been successfully verified. You now have full access to all TypeVenture lessons and games!</p>
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL}/lessons" class="button">Start Learning</a>
            </div>
            <p>Get ready to sharpen your design eye while having fun!</p>
            <div class="footer">
              <p>© 2026 TypeVenture</p>
              <p>Contact us: typeventureweb@gmail.com</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };
    await transporter.sendMail(mailOptions);
    console.log("✅ Success email sent to:", email);
    return true;
  } catch (error) {
    console.error("❌ Error sending success email:", error);
    return false;
  }
};