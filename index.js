const fastify = require("fastify")({ logger: true });

// Register JSON parser (Fastify has built-in JSON support)
fastify.register(require('@fastify/formbody')); // Needed for URL-encoded forms

// Define a POST route for the webhook endpoint
fastify.post("/", async (req, reply) => {
    // Assuming JSON payload is sent
    const payload = req.body;
    console.log("Body =>", payload);

    // Check if payload exists
    if (!payload) {
        reply.code(400).send({ error: "Invalid payload" });
        return;
    }

    // Process the payload here...
    console.log("Received webhook payload:", payload);

    // Send a response
    reply.code(200).send({ message: "Webhook received successfully" });
});

fastify.get("/", async (req, reply) => {
    const payload = req.query;
    console.log("Query =>", payload);
    reply.code(200).send({ msg: "hi" });
});

// Start the server
const start = async () => {
    try {
        await fastify.listen({ port: 8080 });
        console.log("Server listening on http://localhost:8080");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

start();
