import mongoose from "mongoose";

const exploreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    area: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    priceRange: {
      type: String,
      default: "",
    },
    imageUrl: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

const Explore = mongoose.model("Explore", exploreSchema);

export default Explore;
