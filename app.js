import express from "express";
import dotenv from "dotenv";
import crudroutes from "./routes/crudroutes.js";
import { logger } from "./middleware/logger.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ status: "OK" });
});

app.use("/crud", crudroutes);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
