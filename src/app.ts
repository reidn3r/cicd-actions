import Fastify from 'fastify'
import { HealthCheckController } from './routes/health.controller';

export const app = Fastify();

// Endpoints
app.register(HealthCheckController, { prefix: "health" })