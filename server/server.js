import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import transactionRoutes from "./routes/transactionRoutes.js";


dotenv.config();
connectDB();

const app = express();

app.use(cors({ origin: "*", credentials: true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({message : "TrackIt api running"});
});

app.use("/api/auth", authRoutes);  // for authentication routes

app.use("/api/transactions", transactionRoutes);  // for all the transactions (CURD operation)

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT} port number`);
});