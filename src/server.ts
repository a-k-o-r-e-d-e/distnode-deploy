#!/usr/bin/env node
import Fastify from "fastify";
import Recipe from "./recipe";

const HOST = process.env.HOST || "127.0.0.1";
/* istanbul ignore next */
const PORT = process.env.PORT || 8000;

const server = Fastify({ logger: true });

server.get("/", async (req, reply) => {
    return "Hello from Distributed Node.js!";
});

server.get("/recipes/:id", async (req, reply) => {
    const recipe = new Recipe((req.params as any).id);
    await recipe.hydrate();
    return recipe;
});

server.listen({ port: Number(PORT), host: HOST }, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});