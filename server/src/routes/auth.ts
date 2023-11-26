import express from "express";
import {
  signUp,
  login,
  fetchFavorites,
  addFavorite,
  removeFromFavorites,
} from "../userData";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const result = await signUp(email, password);
  res.json(result);
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  const result = await login(email, password);
  res.json(result);
});

authRouter.get("/favorites/:userId", async (req, res) => {
  const userId = req.params.userId;
  const result = await fetchFavorites(userId);
  res.json(result);
});

authRouter.post("/favorites/add/:userId", async (req, res) => {
  const { userId } = req.params;
  const { name, key } = req.body;

  const result = await addFavorite(userId, name, key);
  res.json(result);
});

authRouter.post("/remove/favorite/:userId", async (req, res) => {
  const { userId } = req.params;
  const { key } = req.body;

  const result = await removeFromFavorites(userId, key);
  res.json(result);
});

export default authRouter;
