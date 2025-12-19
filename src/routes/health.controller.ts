import { FastifyInstance } from "fastify";

export async function HealthCheckController(app: FastifyInstance) {
  app.get("/", (request, reply) => {
    return reply.status(200).send({ "ok": true, "timestamp": Date.now() })
  })  
}