const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri:
      process.env.KEYCLOAK_JWKS_URI ||
      "http://localhost:8080/realms/secure-api/protocol/openid-connect/certs",
  }),
  audience: process.env.KEYCLOAK_CLIENT_ID || "api-client",
  issuer:
    process.env.KEYCLOAK_ISSUER || "http://localhost:8080/realms/secure-api",
  algorithms: ["RS256"],
});

module.exports = checkJwt;
