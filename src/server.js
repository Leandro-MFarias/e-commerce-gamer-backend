import express from "express"
import publicRouter from "./routes/publicRoutes.js"
import privateRouter from "./routes/privateRoutes.js"
import cookieParser from "cookie-parser"

const allowedOrigins = [
  "http://localhost:3000",
  "https://e-commerce-gamer-ew6l.onrender.com/"
]

const PORT = process.env.PORT || 3333
const app = express() 
app.use(express.json())
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser())

app.use(publicRouter)
app.use(privateRouter)

app.listen(PORT, console.log(`Servidor rodando na porta: ${PORT}`))