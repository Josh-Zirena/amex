import { FastifyInstance, FastifyRequest } from "fastify";
import fetch from "node-fetch";
import {
  shouldTrip,
  recordFailure,
  recordSuccess,
} from "../utils/circuitBreaker.js";

export default async function eventsRoutes(fastify: FastifyInstance) {
  fastify.post(
    "/addEvent",
    async (request: FastifyRequest<{ Body: Record<string, any> }>, reply) => {
      if (shouldTrip()) {
        return reply.status(503).send({
          error: "Service unavailable, please try again later.",
        });
      }

      try {
        const resp = await fetch("http://event.com/addEvent", {
          method: "POST",
          body: JSON.stringify({
            id: Date.now(),
            ...request.body,
          }),
          headers: { "Content-Type": "application/json" },
        });
        console.log(resp.status);

        if (!resp.ok) throw new Error("Failed to add event");

        const data = await resp.json();
        recordSuccess();
        reply.send(data);
      } catch (err) {
        console.log(err);
        recordFailure();
        reply.status(502).send({ error: "Failed to add event." });
      }
    }
  );

  fastify.get("/getEvents", async (_req, reply) => {
    const resp = await fetch("http://event.com/getEvents");
    const data = await resp.json();
    reply.send(data);
  });
}
