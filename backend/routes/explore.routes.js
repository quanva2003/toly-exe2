import express from "express";
import { createExploreList, deleteExploreList, getExploreList, updateExploreList } from "../controllers/explore.controller.js";

const router = express.Router();

router.get("/", getExploreList);

router.post("/", createExploreList);

router.patch("/:id", updateExploreList);

router.delete("/:id", deleteExploreList);

export default router;
