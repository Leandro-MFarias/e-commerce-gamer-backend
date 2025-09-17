import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function categories(req, res) {
  try {
    const categories = await prisma.category.findMany();
    if (!categories) {
      return res.status(400).json({ message: "Erro ao buscar as categorias." });
    }

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "ERRO NA BUSCA" });
  }
}
