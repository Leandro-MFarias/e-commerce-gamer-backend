import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

function generateAcessToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function createSessionCookies(res, user) {
  // Armazeno o token gerado
  const accessToken = generateAcessToken(user);

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function decodedToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

export function logoutSession(req, res) {
  res.cookie("accessToken", null, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    path: "/",
    maxAge: 0,
  });

  res.status(200).json({ message: "Logout realizado com sucesso" });
}
