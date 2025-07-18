import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createSessionCookies } from "../utils/jwt.js";

const prisma = new PrismaClient();

export async function loginController(req, res) {
  try {
    const userLoginSchema = z.object({
      email: z.email(),
      password: z.string(),
    });

    const { email, password } = userLoginSchema.parse(req.body);

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Senha incorreta." });
    }

    createSessionCookies(res, user)

    res.status(200).send();
  } catch {
    res.status(500).json({ message: "Erro no servidor tente mais tarde" });
  }
}
