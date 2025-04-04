const mongoose = require("mongoose");

const feeSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    remark: { type: String, required: true },
    courseID: { type: String, required: true },
    uID: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("fee", feeSchema);
