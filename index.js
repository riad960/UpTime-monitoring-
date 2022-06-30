//dependencies
const http = require("http");

//app object - module scaffolding
const app = {};

//configuration
app.config = {
  port: 4000,
};
//create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes); //parameter e handle req res func k nebe
  server.listen(app.config.port, () => {
    console.log(`listening to port ${app.config.port} `);
  });
};

//handle req res
app.handleReqRes = (req, res) => {
  res.end("hello world");
};

//start the server
app.createServer();
