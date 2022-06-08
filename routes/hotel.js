const hotelController = require("../controllers/hotelController");

const routes = [
  {
    method: "GET",
    url: "/hotels/all",
    handler: hotelController.allHotels,
  },
  {
    method: "GET",
    url: "/hotels/:id",
    handler: hotelController.getHotel,
  },
  {
    method: "POST",
    url: "/hotels/add",
    handler: hotelController.addHotel,
  },
  {
    method: "PUT",
    url: "/hotels/:id/review",
    handler: hotelController.giveReview,
  },
];

module.exports = routes;

// //get all hotels
// fastify.get("/all");

// //get specific hotel
// fastify.get("/:id");

// //add hotels
// fastify.post("/add");

// //post customer review
// fastify.put("/:id/review");
