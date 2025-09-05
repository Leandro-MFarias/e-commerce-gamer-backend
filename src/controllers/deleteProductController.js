import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function deleteProductController(req, res) {
  const { id } = req.body;

  try {
    if (id) {
      await prisma.product.delete({ where: { id } });
    }
    return res.status(201).json({ message: "Produto Deletado." });
  } catch (error) {
    console.error("DELETE PRODUTO ERRO: ", error);
    res.status(500).json({ message: "ERRO no servidor." });
  }
}
