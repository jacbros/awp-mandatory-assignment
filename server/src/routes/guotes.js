import express from "express";
import Guote from "../models/guote.js";

const guoteRoutes = express.Router();

guoteRoutes.get("/", async (req, res) => {
  const guotes = await Guote.find();
  res.json(guotes);
});

guoteRoutes.post("/", async (req, res) => {
  try {
    const guote = await Guote.create(req.body);
    res.status(201);
    res.json(guote);
  } catch (error) {
    res.status(500);
    res.json({
      error: "Guote could not be created",
      details: error.toString(),
    });
  }
});

guoteRoutes.get("/:id", async (req, res) => {
  try {
    const guote = await Guote.findById(req.params.id);
    if (guote) {
      res.json(guote);
    } else {
      res.status(404);
      res.json({ error: "Guote not found" });
    }
  } catch (error) {
    res.status(500);
    res.json({ error: "Something went wrong", details: error.toString() });
  }
});

export default guoteRoutes;
