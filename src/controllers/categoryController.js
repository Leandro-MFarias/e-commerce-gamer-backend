import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function categoriesController(req, res) {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Faltando dados." });

    const category = await prisma.category.findUnique({
      where: { name },
    });

    if (category) {
      return res.status(400).json({ message: "Essa categoria já existe!" });
    }

    await prisma.category.create({ data: { name } });

    return res
      .status(201)
      .json({ message: "Categoria criada com sucesso!" });
  } catch (error) {
    console.log("Erro categoria: ", error);
    return res
      .status(500)
      .json({ message: "Erro no servidor ao criar Categoria." });
  }
}
