const resp = ({ res, statusCode = 200, code = 0, data }) => {
  res.status(statusCode).json({
    status: true,
    code,
    data,
  });
};

module.exports = resp;
