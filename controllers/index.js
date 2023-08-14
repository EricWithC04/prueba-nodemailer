import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

async function sendMail(mail) {
    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "negativegame117@gmail.com",
        pass: process.env.PASS,
      },
    });
  
    const info = await transporter.sendMail({
      from: "negativegame117@gmail.com", // sender address
      to: "negativegame117@gmail.com", // list of receivers
      subject: "Este es un mensajito de prueba", // Subject line
      text: mail, // plain text body
      html: mail, // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    return "Email enviado con exito";
  }

export async function routeSendEmail (req, res) {
    const { msg } = req.body
    try {
        const newEmail = await sendMail(msg)

        if (!newEmail) {
            throw new Error("No se ha podido enviar el email!")
        }

        return res.status(201).send({ newEmail, msg: "Se ha enviado el email correctamente" });
    } catch (err) {
        console.error(err);
    }
}