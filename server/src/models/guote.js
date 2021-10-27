import mongoose from "mongoose";

const guoteSchema = new mongoose.Schema({
  guote: {
    type: String,
    required: true,
  },
  author: String,
  guotedate: Date,
  likes: Number,
  comments: [String],
});

const Guote = mongoose.model("Guote", guoteSchema);

export default Guote;
