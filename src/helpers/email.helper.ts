import sgMail from "@sendgrid/mail";

const senderEmail = process.env.SENDGRID_SENDER_EMAIL;
const sendGridAPIKey = process.env.SENDGRID_API_KEY;

sgMail.setApiKey(sendGridAPIKey);

const sendVerificationEmail = async (token: string) => {
  const msg = {
    to: "aymenzitouni51@gmail.com", // Change to your recipient
    from: senderEmail, // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `<div><a href='https://www.youtube.com/${token}'>verify your email</a></div>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};

const sendAdminCreationEmail = async (
  email: string,
  password,
  token: string
) => {
  const msg = {
    to: email, // Change to your recipient
    from: senderEmail, // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: `<div><p>email : ${email}</p><p>password : ${password}</p><a href='https://www.youtube.com/${token}'>verify your email</a></div>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};

const sendForgetPasswordEmail = async (reciever: string, token: string) => {
  const msg = {
    to: reciever, // Change to your recipient
    from: senderEmail, // Change to your verified sender
    subject: "Reset Your Password",
    text: "and easy to do anywhere, even with Node.js",
    html: `<div><a href='https://localhost:5000/api/auth/reset-password/${token}'>reset your password</a></div>`,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
};

const sendEmail = async (token: string) => {
  const msg = {
    to: "aymenzitouni51@gmail.com", // Change to your recipient
    from: senderEmail, // Change to your verified sender
    subject: "Sending with SendGrid is Fun",
    text: "and easy to do anywhere, even with Node.js",
    html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

export default {
  sendVerificationEmail,
  sendAdminCreationEmail,
  sendForgetPasswordEmail,
  sendEmail,
};
