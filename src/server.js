import express from "express"
import publicRouter from "./routes/publicRoutes.js"
import privateRouter from "./routes/privateRoutes.js"
import cookieParser from "cookie-parser"

const PORT = 3333
const app = express() 
app.use(express.json())
app.use(cookieParser())

app.use(publicRouter)
app.use(privateRouter)

app.listen(PORT, console.log(`Server rodando na porta ${PORT}`))