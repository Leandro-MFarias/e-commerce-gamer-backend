import z from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Campo obrigatório"),
  description: z.string().optional(),
  category: z.string(),
  price: z.int().min(1, "Campo obrigatório"),
  stock: z.int().min(1, "Campo obrigatório"),
  imageUrl: z.any(),
});
