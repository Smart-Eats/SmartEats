export const validate = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({
      success: false,
      message: "Validation Error",
      error: error.details.map((err) => err.message),
    });
  }
  req.validate=value;
  next();
};
