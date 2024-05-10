import Explore from "../models/explore.model.js";

export const getExploreList = async (req, res) => {
  try {
    const results = await Explore.find();
    res.status(200).json(results);
  } catch (error) {
    console.error("Error in getExploreList: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  };
};

export const createExploreList = async (req, res) => {
  try {
    // const {token} = req.headers;
    const newExplore = await Explore.create(req.body);
    res.status(200).json(newExplore);
  } catch (error) {
    console.error("Error in createExploreList: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  };
};

export const updateExploreList = async (req, res) => {
  try {
    const exporeId = req.params.id;
    const updateExplore = await Explore.findByIdAndUpdate(exporeId, { name: "Trieu Tien" });
    res.status(200).json(updateExplore);
  } catch (error) {
    console.error("Error in updateExploreList: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  };
};

export const deleteExploreList = async (req, res) => {
  try {
    const explore = await Explore.findByIdAndDelete(req.params.id);
    res.status(200).json(explore);
  } catch (error) {
    console.error("Error in deleteExploreList: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  };
};