const hotel = require("../models/hotel");
const { ObjectId } = require("mongodb");

//get all hotels
exports.allHotels = async (req, reply) => {
  const result = await hotel.find({});
  reply.code(201).send(result);
};

//get specific hotel
exports.getHotel = async (req, reply) => {
  const result = await hotel.findOne({ _id: ObjectId(req.params.id) });
  if (!result) {
    reply.code(501).send({ message: "Not found" });
  }
  return reply.code(201).send(result);
};

//add hotels
exports.addHotel = async (req, reply) => {
  const { name, location, description } = req.body;

  try {
    const hotelInfo = { name, location, description };
    const newHotel = new hotel(hotelInfo);
    const result = await newHotel.save();

    reply.code(201).send(result);
  } catch (err) {
    reply.code(401).send(err);
  }
};

//post customer review
exports.giveReview = async (req, reply) => {
  const { username, review } = req.body;

  try {
    const result = await hotel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { reviews: { username: username, review: review } },
      },
      { new: true }
    );

    reply.code(201).send(result);
  } catch (err) {
    reply.code(401).send(err);
  }
};
