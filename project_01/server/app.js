import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Redis } from "ioredis";
import axios from "axios";
import connectDB from "./db/database.js";
import userRouter from "./routes/user.js";
import todoRouter from "./routes/todo.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

const redisClient = new Redis();

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
// app.use(cors());

// docker se redis start krna padega pehle
app.get("/posts", async (re, res) => {
    try {
        const cachedData = await redisClient.get("posts");

        if(cachedData != null) {
            console.log("cached data...");
            return res.json(JSON.parse(cachedData));
        } else {
            console.log("uncached data...");
            const { data } = await axios("https://jsonplaceholder.typicode.com/posts");
            // await redisClient.set("posts", JSON.stringify(data));
            await redisClient.setex("posts", 10, JSON.stringify(data));

            return res.json(data);
        }
    } catch (error) {
        console.log("error");
    }
});

// routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/todo", todoRouter);


app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}...`);
});