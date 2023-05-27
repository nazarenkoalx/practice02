module.exports = (error, req, res, next) => {
  console.log(res.statusCode);
  const statusCode = res.statusCode || 500;
  const errorStack =
    process.env.NODE_ENV === "development" ? error.stack : null;
  res.status(statusCode);
  res.json({ code: statusCode, stack: errorStack });
};
