import nodemailer from "nodemailer";

export default function sendEmail(userInfo) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: {
      name: "PrimeHaven Support",
      address: process.env.SMTP_EMAIL,
    },
    to: userInfo.email,
    subject: "Reset Password",
    html: `
    <p>
      Hello ${userInfo.username}, <br /><br />
      Thank you for reaching out to PrimeHaven regarding resetting password.
      Navigate through the below link for resetting your password. 
    </p>
    <a href="http://localhost:5173/update-password">Reset Password</a>
    <p>
      If you have not requested this email, then please ignore it. <br /><br />
      Regards, <br />
      Support Team, <br />
      PrimeHaven.
    </p>`,
  };

  transporter.sendMail(mailOptions);
}
