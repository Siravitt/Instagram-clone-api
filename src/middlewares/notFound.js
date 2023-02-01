module.exports = (req, res, next) =>
  res.status(400).json({ message: "Resource not found" });
