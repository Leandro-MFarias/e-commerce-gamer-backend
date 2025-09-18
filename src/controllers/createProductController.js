import { productSchema } from "../types/productSchema.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function craeteProductController(req, res) {
  try {
    const { name, description, price, stock, imageUrl, categories } =
      productSchema.parse(req.body);

    await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        imageUrl,
        categories: {
          connect: categories.map((id) => ({ id })),
        },
      },
      include: {
        categories: true,
      },
    });

    return res.status(201).json({ message: "Produto criado!" });
  } catch (error) {
    if (error.errors) {
      return res
        .status(400)
        .json({ message: "Erro de validação", errors: error.errors });
    }

    console.error(error);

    return res
      .status(500)
      .json({ message: "Erro no servidor ao criar produto." });
  }
}
