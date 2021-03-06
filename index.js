const fastify = require("fastify")({ logger: true });
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const routes = require("./routes/hotel");
const swagger = require("./config/swagger");
const port = process.env.PORT || 8000;

dotenv.config();

const uri = process.env.URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected to database succesfully!");
  })
  .catch((err) => {
    console.log(err);
  });

//Fastify-cors
fastify.register(require("fastify-cors"), {
  origin: "*",
  methods: ["GET", "PUT", "POST"],
});

// register swagger
fastify.register(require("@fastify/swagger"), swagger.options);

// server test route
fastify.get("/", function (req, reply) {
  reply.send({ message: "hotel server is running!!!!" });
});

routes.forEach((route, index) => {
  fastify.route(route);
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(port, "0.0.0.0");
    fastify.swagger();
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
