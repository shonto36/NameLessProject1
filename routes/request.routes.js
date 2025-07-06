const router = require("express").Router();
const { body } = require("express-validator");
const controller = require("../controllers/request.controller");
const validate = require("../middlewares/validator");
const { MSG_NAME_REQUIRED } = require("../utils/constants");
const { keycloak } = require("../middlewares/keycloak");
const checkJwt = require("../middlewares/keycloak");

// POST /api/submit
router.post(
  "/submit",
  keycloak.protect(["user", "admin"]),
  body("name").isString().notEmpty().withMessage(MSG_NAME_REQUIRED),
  validate,
  controller.submitRequest
);

// Secure route using JWT validation
router.post("/secure", checkJwt, controller.submitRequest);

module.exports = router;
