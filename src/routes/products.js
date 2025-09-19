import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function products(req, res) {
  try {
    const products = await prisma.product.findMany({
      include: {
        categories: {
          select: {
            id: true,
            name: true,
          }
        }
      }
    })
    if (!products) return res.status(404).json({ message: "Nenhuma produto encontrado" }) 

    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos!" })
  }
} 