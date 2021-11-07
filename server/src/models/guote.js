import mongoose from "mongoose";

const guoteSchema = new mongoose.Schema({
  guote: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [String],
});

const Guote = mongoose.model("Guote", guoteSchema);

export default Guote;
