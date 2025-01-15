function sendResponse(res, status, message, data = null) {
  res.status(status).json({
    success: status < 400,
    message: message,
    data: data,
  });
}

module.exports = sendResponse;
