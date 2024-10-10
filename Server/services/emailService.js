const {transporter} = require("../config/mailConfig");

const sendMail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: {
        name: "Nothing's New",
        address: "pkumar24rk@gmail.com",
      },
      to,
      subject,
      html,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = { sendMail };
