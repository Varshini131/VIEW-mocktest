const mongoose = require("mongoose");

const RegistrationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    college: { type: String, required: true, trim: true },
    scored: { type: Number, required: true },
    max: { type: Number, required: true },
    branches: { type: [String], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", RegistrationSchema);