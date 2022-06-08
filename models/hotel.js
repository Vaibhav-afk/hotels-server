const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema({
  name: String,
  location: String,
  description: String,
  reviews: [
    {
      username: String,
      review: String,
    },
  ],
});

module.exports = mongoose.model("hotel", hotelSchema);
