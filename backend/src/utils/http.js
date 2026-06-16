function sendJson(res, status, payload) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.FRONTEND_ORIGIN || "http://localhost:3000",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(payload));
}

function ok(res, data, status = 200) {
  sendJson(res, status, { success: true, data });
}

function fail(res, message, status = 400) {
  sendJson(res, status, { success: false, error: message });
}

function notFound(res) {
  fail(res, "Route not found.", 404);
}

module.exports = {
  fail,
  notFound,
  ok,
  sendJson,
};
