const nodemailer = require("nodemailer");

async function sendEmail(data) {
  const { userEmail, userName, userMessage } = data;
  const transporter = nodemailer.createTransport({
    host: "smtp.ukr.net",
    port: 465,
    secure: true,
    auth: {
      user: "nazarenko.alx@ukr.net",
      pass: "CpVG3B9bs5wWzvZ1",
    },
  });

  const output = `<h1 style="color: blue">Privet director</h1> <p>you have recieved a letter from ${userName}</p> <p style="color: green">Text: ${userMessage}</p>`;

  const info = await transporter.sendMail({
    from: "nazarenko.alx@ukr.net", // sender address
    to: "alex.nazarenko94@gmail.com", // list of receivers
    subject: "2023 June 30 First Multigalaxy coference held in Kyiv ", // Subject line
    text: userMessage, // plain text body
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
  return true;
}

module.exports = sendEmail;
