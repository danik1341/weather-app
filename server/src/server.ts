// src/server.ts
import express from "express";
import authRouter from "./routes/auth";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/auth", authRouter);

// Other server setup

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
