const mongoose = require("mongoose");

const studentSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    imageURL: { type: String, required: true },
    imageID: { type: String, required: true },
    courseID: { type: String, required: true },
    uID: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("student", studentSchema);
