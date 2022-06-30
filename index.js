//dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");

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

app.handleReqRes = handleReqRes;

//start the server
app.createServer();
