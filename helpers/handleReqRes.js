const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const {
  notFoundHandler,
} = require("../handlers/routesHandler/notFoundHandler");
const handler = {};
handler.handleReqRes = (req, res) => {
  //req handle
  // get the url and parse it
  const ParsedUrl = url.parse(req.url, true); // if you put false here it will not consider query strings like [id]

  const path = ParsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, ""); //this regex will replace any unwanted / at the end of the url

  //getting the method
  const method = req.method.toLowerCase();

  //getting the querry string
  const queryStringObject = ParsedUrl.query;

  //   getting the headers
  const headerObject = req.headers;

  //defining the request properties
  const requestProperties = {
    ParsedUrl,
    method,
    queryStringObject,
    trimmedPath,
    headerObject,
    path,
  };

  //getting req body or payload
  const decoder = new StringDecoder("utf-8");
  let realData = "";

  //checking routes
  const chosenHandler = routes[trimmedPath]
    ? routes[trimmedPath]
    : notFoundHandler;
  chosenHandler(requestProperties, (statuscode, payload) => {
    statuscode = typeof statuscode === "number" ? statuscode : 500;
    payload = typeof payload === "object" ? payload : {};
    const payloadString = JSON.stringify(payload);
    //return the final response
    res.writeHead(statuscode);
  });
  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();
    console.log(realData);
  });

  //response handle
  res.end("hello world");
};
module.exports = handler;
