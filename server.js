const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

// Enable CORS
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Add other JSON Server middlewares
server.use(middlewares);

// Use the router
server.use(router);

// Start the server
server.listen(3000, () => {
  console.log("JSON Server is running on port 3000");
});
