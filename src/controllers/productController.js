import { productSchema } from "../types/productSchema.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function productController(req, res) {
  try {
    const { name, description, price, stock, imageUrl } = productSchema.parse(
      req.body
    );

    const product = await prisma.product.create({
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

    return res.status(201).json(product, { message: "Produto criado!" });
  } catch (error) {
    if (error.errors) {
      return res
        .status(400)
        .json({ message: "Erro de validação", errors: error.errors });
    }

    return res
      .status(500)
      .json({ message: "Erro no servidor ao criar produto." });
  }
}
