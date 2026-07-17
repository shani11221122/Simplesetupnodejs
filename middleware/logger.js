export const logger = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const responseTime = Date.now() - start;

    console.log(
      `${req.method} ${req.originalUrl} - ${responseTime}ms`
    );
  });

  next();
};

