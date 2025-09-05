import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function profileRouter(req, res) {
  const userId = req.userId;

  try {
    if (!userId) {
      res.status(404).json({ message: "ID de usuário não encontrado" });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        fullname: true,
        email: true,
        address: true,
        cartItems: {
          select: {
            product: true,
            quantity: true,
          },
        },
        favorites: {
          select: {
            product: true,
          },
        },
        orders: {
          select: {
            items: true,
            totalAmount: true,
            status: true,
          },
        },
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Não autorizado" });
  }
}
