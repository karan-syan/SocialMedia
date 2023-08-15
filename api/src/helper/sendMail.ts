const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "victoria.brakus@ethereal.email",
    pass: "dFQG5AP8uaPm7sgQbH",
  },
});

export const sendResetMail = async (
  email: string,
  token: string,
  name: string
) => {
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <victoria.brakus@ethereal.email>',
    to: email,
    subject: "reset-password",
    html: `<p> hi ${name} please copy the link  <a href="http://localhost:3000/resetPassword/${token}" >and reset your password </a> </p>`,
  });
  console.log("Message sent: %s", info.messageId);
};
