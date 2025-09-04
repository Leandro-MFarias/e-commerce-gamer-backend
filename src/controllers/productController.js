import { productSchema } from "../types/productSchema.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function productController(req, res) {
  try {
    const { name, description, price, stock, imageUrl } = productSchema.parse(
      req.body
    );

    if ((!name, !description, !price, !stock, !imageUrl)) {
      return res.status(400).json({ message: "Algum campo está faltando." });
    }

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        imageUrl
      }
    })

  } catch (error) {
    return res.status(500).json({ message: "Erro no servidor ao criar produto." })
  }
}
