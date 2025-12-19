import "reflect-metadata";
import Fastify from 'fastify'
import { HealthCheckController } from './routes/health.controller';
import { ValidationController } from "./routes/validation.controller";

export const app = Fastify();

// Endpoints
app.register(HealthCheckController, { prefix: "health" })
app.register(ValidationController, { prefix: "validate" })