import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET

function generateAcessToken(user) {
  return jwt.sign({ id: user.id}, JWT_SECRET, {
    expiresIn: "7d",
  })
}

export function createSessionCookies(res, user) {
  // Armazeno o token gerado
  const accessToken = generateAcessToken(user)

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    sameSite: "None",
    secure: true,
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export function decodedToken(token) {
  const decoded = jwt.verify(token, JWT_SECRET)
  
  return decoded.id
}