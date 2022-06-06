import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});
// CommonJs
const fastify = require("fastify")({
  logger: true,
});

// Declare a route
fastify.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

// Run the server!
const PORT = 5000;
fastify.listen(PORT, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }else{
      console.log(`Server is now listening on ${PORT}`);
  }
});
