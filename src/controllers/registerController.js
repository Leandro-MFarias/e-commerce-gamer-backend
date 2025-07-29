import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

const prisma = new PrismaClient();

export async function registerController(req, res) {
  try {
    const userRegisterSchema = z.object({
      fullname: z.string(),
      email: z.email(),
      password: z.string(),
    });

    const { fullname, email, password } = userRegisterSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "Esse email já foi cadastrado" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashPassword,
      },
    });

    res.status(201).json({ message: "Conta criada" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Erro no servidor ao criar Usuário tente mais tarde` });
  }
}