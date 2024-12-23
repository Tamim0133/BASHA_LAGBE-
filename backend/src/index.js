import connectDB from "./db/connect.js";
import app from "./app.js";
import dotenv from "dotenv"

dotenv.config()


const PORT = 8000
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`⚙️ Server is running!`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})