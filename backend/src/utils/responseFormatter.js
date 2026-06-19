const responseFormatter = (req, res, next) => {
  res.success = ({ statusCode = 200, data = null, message, meta } = {}) =>
    res.status(statusCode).json({
      success: true,
      message,
      data,
      meta,
    });

  res.created = ({ data, message = "Resource created successfully" } = {}) =>
    res.success({
      statusCode: 201,
      message,
      data,
    });

  next();
};

module.exports = responseFormatter;
