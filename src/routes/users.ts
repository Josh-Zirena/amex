import { FastifyInstance } from "fastify";
import fetch from "node-fetch";

export default async function usersRoutes(fastify: FastifyInstance) {
  fastify.get("/getUsers", async (_req, reply) => {
    const resp = await fetch("http://event.com/getUsers");
    const data = await resp.json();
    reply.send(data);
  });
}
