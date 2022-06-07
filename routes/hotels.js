const {
  allHotels,
  getHotel,
  addHotel,
  postReview,
} = require("../controllers/hotels.controller");

const getAllHotelsopts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string" },
            location: { type: "string" },
            description: { type: "string" },
            review: { type: "array" },
          },
        },
      },
    },
  },
  handler: allHotels,
};

const getHotelOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          _id: { type: "string" },
          name: { type: "string" },
          location: { type: "string" },
          description: { type: "string" },
          review: { type: "array" },
        },
      },
    },
  },
  handler: getHotel,
};

const addHotelOpts = {
  schema: {
    body: {
      type: "object",
      required: ["name", "location"],
      properties: {
        _id: { type: "string" },
        name: { type: "string" },
        location: { type: "string" },
        description: { type: "string" },
        review: [],
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "object" },
        },
      },
    },
  },
  handler: addHotel,
};

const postReviewOpts = {
  schema: {
    body: {
      type: "object",
      required: ["username", "review"],
      properties: {
        username: { type: "string" },
        review: { type: "string" },
      },
    },
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: object },
        },
      },
    },
  },
  handler: postReview,
};

async function hotels(fastify, options) {
  //get all hotels
  fastify.get("/all", getAllHotelsopts);

  //get specific hotel
  fastify.get("/:id", getHotelOpts);

  //add hotels
  fastify.post("/add", addHotelOpts);

  //post customer review
  fastify.put("/:id/review", postReview);
}

module.exports = hotels;
