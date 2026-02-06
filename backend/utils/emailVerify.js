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

export const sendLessonCompletionEmail = async (email, username, completedLesson, nextLesson = null) => {
  try {
    const transporter = createTransporter();
    
    // Determine email content based on whether there's a next lesson
    const nextLessonContent = nextLesson 
      ? `
        <div class="next-lesson-box">
          <h3 style="color: #0029FF; margin-bottom: 10px;">Up Next:</h3>
          <h4 style="margin: 10px 0;">${nextLesson.title}</h4>
          <p style="color: #666; line-height: 1.6;">${nextLesson.content.description}</p>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <a href="${process.env.FRONTEND_URL}/lessons" class="button">Continue Learning</a>
        </div>
      `
      : `
        <div class="completion-box">
          <h3 style="color: #FF1414; margin-bottom: 10px;">🎊 All Lessons Completed!</h3>
          <p style="color: #666; line-height: 1.6;">You've finished all available lessons. Great job on your learning journey!</p>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <a href="${process.env.FRONTEND_URL}/lessons" class="button">Review Lessons</a>
        </div>
      `;

    const mailOptions = {
      from: `"TypeVenture" <${process.env.SMTP_USER}>`,
      to: email,
      subject: `Lesson Completed: ${completedLesson.title} - TypeVenture`,
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
            .lesson-completed-box { 
              background: linear-gradient(135deg, #0029FF, #a200ff); 
              color: white; 
              padding: 20px; 
              border-radius: 8px; 
              text-align: center; 
              margin: 20px 0; 
            }
            .next-lesson-box {
              background: #f8f9fa;
              padding: 20px;
              border-left: 4px solid #0029FF;
              border-radius: 4px;
              margin: 20px 0;
            }
            .completion-box {
              background: linear-gradient(135deg, #FF1414, #a200ff);
              color: white;
              padding: 20px;
              border-radius: 8px;
              text-align: center;
              margin: 20px 0;
            }
            .button { 
              display: inline-block; 
              background: linear-gradient(135deg, #FF1414, #a200ff, #0029FF); 
              color: white; 
              padding: 12px 30px; 
              border-radius: 8px; 
              text-decoration: none; 
              margin: 20px 0;
              font-weight: 600;
            }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🎮 TypeVenture</div>
              <h2>Lesson Completed!</h2>
            </div>
            
            <div class="success-icon">🎉</div>
            
            <p>Congratulations <strong>${username}</strong>!</p>
            
            <div class="lesson-completed-box">
              <h3 style="margin: 0 0 10px 0;">✓ ${completedLesson.title}</h3>
              <p style="margin: 0; opacity: 0.9;">${completedLesson.content.description}</p>
            </div>
            
            <p style="color: #666; line-height: 1.6;">
              You've successfully completed this lesson and gained valuable knowledge about typography and design principles. Keep up the great work!
            </p>
            
            ${nextLessonContent}
            
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
    console.log("✅ Lesson completion email sent to:", email);
    return true;
  } catch (error) {
    console.error("❌ Error sending lesson completion email:", error);
    return false; // Don't throw error - email failure shouldn't stop lesson completion
  }
};

export const sendPasswordResetEmail = async (email, username, resetCode) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: `"TypeVenture" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Password Reset Request - TypeVenture",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Poppins', Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; }
            .logo { font-size: 28px; font-weight: bold; color: #0029FF; }
            .code-box { background: linear-gradient(135deg, #FF1414, #000000, #0029FF); color: white; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .code { font-size: 32px; font-weight: bold; letter-spacing: 5px; }
            .warning-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🎮 TypeVenture</div>
              <h2>Password Reset Request</h2>
            </div>
            <p>Hello <strong>${username}</strong>,</p>
            <p>We received a request to reset your password. Please use the code below to reset your password:</p>
            <div class="code-box">
              <div class="code">${resetCode}</div>
            </div>
            <p>This code will expire in <strong>15 minutes</strong>.</p>
            <div class="warning-box">
              <p style="margin: 0; color: #856404;"><strong>⚠️ Security Notice:</strong> If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
            </div>
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
    console.log("✅ Password reset email sent to:", email);
    return true;
  } catch (error) {
    console.error("❌ Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

export const sendPasswordResetSuccessEmail = async (email, username) => {
  try {
    const transporter = createTransporter();
    const mailOptions = {
      from: `"TypeVenture" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Password Changed Successfully - TypeVenture",
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
            .info-box { background: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px; margin: 20px 0; border-radius: 4px; color: #0c5460; }
            .button { display: inline-block; background: linear-gradient(135deg, #0029FF, #FF1414); color: white; padding: 12px 30px; border-radius: 8px; text-decoration: none; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🎮 TypeVenture</div>
              <h2>Password Changed Successfully</h2>
            </div>
            <div class="success-icon">✅</div>
            <p>Hello <strong>${username}</strong>,</p>
            <p>Your password has been successfully changed. You can now log in with your new password.</p>
            <div class="info-box">
              <p style="margin: 0;"><strong>🔒 Security Tip:</strong> If you didn't make this change, please contact us immediately at typeventureweb@gmail.com</p>
            </div>
            <div style="text-align: center;">
              <a href="${process.env.FRONTEND_URL}/login" class="button">Log In Now</a>
            </div>
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
    console.log("✅ Password reset success email sent to:", email);
    return true;
  } catch (error) {
    console.error("❌ Error sending password reset success email:", error);
    return false;
  }
};