import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  subtitle:    { type: String },
  author:      { type: String, default: "Admin" },
  readTime:    { type: String, default: "5 min read" },
  featuredImage: { type: String, default: "" },

  content: {
    intro:          { type: String },
    sections: [
      {
        heading:    { type: String },
        body:       { type: String },
        image:      { type: String },
        listItems:  [{ type: String }],
      }
    ]
  },

  isActive:    { type: Boolean, default: true },
  publishedAt: { type: Date, default: Date.now },
  createdAt:   { type: Date, default: Date.now },
});

export default mongoose.model("Article", articleSchema);