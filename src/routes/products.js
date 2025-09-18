import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function products(req, res) {
  try {
    const products = await prisma.product.findMany()
    if (!products) return 

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos!" })
  }
}  