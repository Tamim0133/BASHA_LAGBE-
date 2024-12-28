import express from "express"
import locationRouter from './routes/location.router.js'
import adRouter from './routes/ad.router.js'
import cors from "cors"

const app = express()


app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use("/api/location", locationRouter)
app.use("/api/ad", adRouter)




export default app
