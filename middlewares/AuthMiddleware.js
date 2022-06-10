const jwt = require("jsonwebtoken");
const { NotAuthorizedError } = require("../helpers/errors");

const authMiddleware = (req, res, next) => {
  try {
    // TODO: validate token type later
    const { authorization } = req.headers;
    if (!authorization) {
      next(res.status(401).json({ message: "Not authorized" }));
    }

    const [token] = authorization.split(" ");

    if (!token) {
      next(res.status(401).json({ message: "Not authorized" }));
    }

    const owner = jwt.decode(token, process.env.JWT_SECRET);

    req.token = token;
    req.owner = owner;
    next();
  } catch (err) {
    next(new NotAuthorizedError("Invalid token"));
  }
};

module.exports = {
  authMiddleware,
};
