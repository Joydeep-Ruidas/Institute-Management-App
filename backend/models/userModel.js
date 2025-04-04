const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    imageURL: { type: String, required: true },
    imageID: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
