import express from "express";
import dotenv from "dotenv";
import crudroutes from "./routes/crudroutes.js";
import { logger } from "./middleware/logger.js";
import mongoose from "mongoose";
import { errorhandler } from "./middleware/errorhandler.js";    
import uploadroutes from "./routes/uploadroutes.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.get("/", (req, res) => {
    res.status(200).json({ status: "OK" });
});

app.use("/crud", crudroutes);
app.use("/upload", uploadroutes);
app.use(errorhandler);
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

export default app;

