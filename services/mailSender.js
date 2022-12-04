// const nodemailer = require("nodemailer");
// require('dotenv').config();

// module.exports = mailSender = (toEmail, content, subject, res) => {

//     const transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.EMAIL_ID,
//             pass: process.env.EMAIL_PASSWORD,
//         },
//     });

//     const mailOptions = {
//         from: process.env.EMAIL_ID,
//         to: toEmail,
//         subject: subject,
//         html: content,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.log(error);
//             console.log(info);
//             return res.status(500).send(error);
//         } else {
//             console.log(info);
//             console.log('Email sent!');
//         }
//     });
// };
