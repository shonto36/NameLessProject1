
Create a secure, scalable Node.js API server using Express.js. The server will expose an endpoint that receives validated requests from the UI, inserts them into MongoDB using an ORM like Mongoose, and publishes a corresponding message to RabbitMQ. If RabbitMQ is unavailable, the message should be persisted in MongoDB (in a pending_messages or outbox collection) rather than kept in memory. A background retry worker will monitor this collection and attempt to re-publish the messages once RabbitMQ connectivity is restored. [later aws orm]

The project should include all cross-cutting concerns like detailed logging, input validation with expressive error handling, and audit logging for key actions. Security should be handled via Keycloak; the server must be protected using Keycloak authentication, and APIs must validate tokens for role-based access. Implement middleware for logging, error handling, validation, and authentication. Structure the project cleanly into config, routes, controllers, services, and models folders. 

Finally, the entire application including MongoDB, RabbitMQ, and Keycloak should be containerized using Docker(later)
