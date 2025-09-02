import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function resetPasswordController(req, res) {
  try {
    const { email, token, password } = req.body;

    if (!email || !token || !password) {
      return res.status(400).json({ message: "Dados inválidos!" });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    if (user.resetToken !== token || user.resetTokenExpire < new Date()) {
      return res.status(400).json({ message: "Token inválido ou expirado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpire: null,
      },
    });

    res.status(200).json({ message: "Senha atualizada com sucesso!" });
  } catch (error) {
    res.status(500).json({ message: "ERRO no servidor", error })
  }
}
