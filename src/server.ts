import Fastify from "fastify";
import { createRequire } from "module";
import usersRoutes from "./routes/users.js";
import eventsRoutes from "./routes/events.js";
import userEventsRoutes from "./routes/userEvents.js";

const require = createRequire(import.meta.url);
const listenMock = require("../mock-server/index.js");

const fastify = Fastify({ logger: true });

// Register routes
await fastify.register(usersRoutes);
await fastify.register(eventsRoutes);
await fastify.register(userEventsRoutes);

// Start server
fastify.listen({ port: 3000 }, (err) => {
  listenMock(); // DO NOT REMOVE
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
