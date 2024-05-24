function errorHandler(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500).json({
    success: false,
    message: "Internal Server Error",
    status: err.status,
    error: err.message,
  });
  res.send("Error " + err.status);
}

module.exports = { errorHandler };
