import { decodedToken } from "../utils/jwt.js";

export async function auth(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: "Acesso negado" });
  }

  try {
    const userId = decodedToken(token)
    if (!userId) {
      return res.status(401).json({ message: "Acesso Negado" })
    }

    req.userId = userId

    next()
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
}
