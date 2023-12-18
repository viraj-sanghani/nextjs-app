const express = require("express");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Your other routes or middleware

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  const port = process.env.PORT || 5800;
  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`Server running :)`);
  });
});
