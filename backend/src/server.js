const http = require("http");
const { route } = require("./routes");

const port = Number(process.env.PORT || 4000);

const server = http.createServer(route);

server.listen(port, () => {
  console.log(`BookMyVenue backend running on http://localhost:${port}`);
});
