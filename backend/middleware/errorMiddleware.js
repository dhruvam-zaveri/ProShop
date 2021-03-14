const notFound = (res, req, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  // At the very beginning we need to figure out the status code
  // when processing any route, we need to first set the correct status and then throw error
  // now sometimes we can get 200 stuts code even if there is an error
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  // if there is an error but the status code is 200 then we will set it to 500; 500 is server error but it is kinda the
  // fallback code, a default we can sasy
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
  // We only need to display error stack when we are in development mode
};

export { notFound, errorHandler };
