const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  courseName: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  startingDate: { type: String, required: true },
  endDate: { type: String, required: true },
  imageID: { type: String, required: true },
  imageURL: { type: String, required: true },
  uID: { type: String, required: true },
});

module.exports = mongoose.model("course", courseSchema);
