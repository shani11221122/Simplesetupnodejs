export const errorhandler = (err, req, res, next) => {
  console.error(err.name, "-", err.message);

  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: `Invalid ${err.path}: ${err.value}`,
    });
  }

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      error: messages.join(", "),
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({
      success: false,
      error: `${field} already exists`,
    });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      success: false,
      error: "Malformed JSON in request body",
    });
  }

  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    error: statusCode === 500 ? "Internal server error" : err.message,
  });
};