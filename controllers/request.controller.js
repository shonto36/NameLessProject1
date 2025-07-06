const service = require("../services/request.service");
const { MSG_REQUEST_SAVED } = require("../utils/constants");

exports.submitRequest = async (req, res, next) => {
  try {
    const { name, data } = req.body;
    const user =
      req.kauth && req.kauth.grant && req.kauth.grant.access_token
        ? req.kauth.grant.access_token.content.preferred_username
        : "anonymous";
    // Business-level audit log
    console.log(
      `[AUDIT] User '${user}' submitted a request with name: '${name}'`
    );
    const saved = await service.createRequest({ name, data });

    res.status(201).json({
      message: MSG_REQUEST_SAVED,
      id: saved._id,
    });
  } catch (error) {
    next(error);
  }
};
