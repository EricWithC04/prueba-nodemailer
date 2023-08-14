import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import router from "./routes/index.js";
dotenv.config();
const port = process.env.PORT;

const app = express()

app.use(morgan("dev"))
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// app.use(express.static(path.join(__dirname, "public")));

app.use("/", router)

app.listen(port, () => {
    console.log(`Server listen in port ${port}`);
})
