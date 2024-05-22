const express = require("express");
const { createExploreList, deleteExploreList, getExploreList, updateExploreList } = require("../controllers/exploreControllers");

const router = express.Router();

router.get("/", getExploreList);

router.post("/", createExploreList);

router.patch("/:id", updateExploreList);

router.delete("/:id", deleteExploreList);

module.exports = router;