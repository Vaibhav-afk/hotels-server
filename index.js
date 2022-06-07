const fastify = require("fastify")({ logger: true });
const dotenv = require("dotenv");

dotenv.config();

fastify.register(require("fastify-mongodb"), {
  forceClose: true,
  url: process.env.CONNECT_DB,
});

fastify.register(require("./routes/hotels"), { prefix: "/hotels" });

// server test route
fastify.get("/", function (req, res) {
  res.send({ message: "hotel server is running!!!!" });
});

// Run the server!
const PORT = 5000;
fastify.listen(PORT, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  } else {
    console.log(`Server is now listening on ${PORT}`);
  }
});
