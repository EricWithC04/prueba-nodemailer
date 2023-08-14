import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function sendMail(mail) {
    const transporter = await nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });
  
    const info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: mail.senderEmail, // list of receivers
      subject: mail.subject, // Subject line
      text: mail.msg, // plain text body
      html: `<p>${mail.msg}</p>`, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    return "Email enviado con exito";
  }

export async function routeSendEmail (req, res) {
    const { msg, senderEmail, subject } = req.body
    try {
        const newEmail = await sendMail({msg, senderEmail, subject})

        if (!newEmail) {
            throw new Error("No se ha podido enviar el email!")
        }

        return res.status(201).send({ newEmail, msg: "Se ha enviado el email correctamente" });
    } catch (err) {
        console.error(err);
    }
}