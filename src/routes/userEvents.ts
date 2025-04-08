import { FastifyInstance, FastifyRequest } from "fastify";
import fetch from "node-fetch";

type UserData = {
  events?: string[];
};

export default async function userEventsRoutes(fastify: FastifyInstance) {
  fastify.get(
    "/getEventsByUserId/:id",
    async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
      const { id } = request.params;
      const userResp = await fetch(`http://event.com/getUserById/${id}`);
      const userData = (await userResp.json()) as UserData;

      const userEvents: string[] = userData.events || [];

      console.log(userEvents);

      const eventArray = await Promise.all(
        userEvents.map(async (eventId) => {
          const event = await fetch(`http://event.com/getEventById/${eventId}`);
          return event.json();
        })
      );

      reply.send(eventArray);
    }
  );
}
