import nodemailer from "nodemailer";
import crypto from "crypto";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function forgotPasswordController(req, res) {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Coloque um email" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Email não registrado!" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpire = new Date(Date.now() + 3600000);
    const resetUrl = `https://e-commerce-gamer-omega.vercel.app/reset-password?token=${resetToken}&email=${email}`;

    await prisma.user.update({
      where: { email },
      data: {
        resetToken,
        resetTokenExpire,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Reaload Store" <${process.env.MY_GMAIL}>`,
      to: email,
      subject: "Reset de senha - Reload Store",
      html: `
          <p>Você solicitou reset de senha.</p>
          <p>
            Clique aqui para redefinir:
            <a href="${resetUrl}">${resetUrl}</a>
          </p>
          <p>Esse link expira em 1 hora.</p>
      `,
    });

    res.status(200).json({ message: "Email enviado com sucesso!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `ERRO no servidor ao enviar msg ${error}` });
  }
}
