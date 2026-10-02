/* tiny zero-dep static server for local checking: node tools/serve.js [port] */
"use strict";
const http = require("http"), fs = require("fs"), path = require("path");
const root = path.join(__dirname, "..");
const port = Number(process.argv[2] || 8123);
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".txt": "text/plain", ".xml": "application/xml" };
http.createServer(function (req, res) {
  const u = decodeURIComponent(req.url.split("?")[0]);
  const file = path.join(root, u === "/" ? "index.html" : u);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end("no"); }
  fs.readFile(file, function (err, data) {
    if (err) { res.writeHead(404, { "content-type": "text/plain" }); return res.end("404 " + u); }
    res.writeHead(200, { "content-type": (TYPES[path.extname(file)] || "text/plain") + "; charset=utf-8" });
    res.end(data);
  });
}).listen(port, function () { console.log("serving " + root + " on http://localhost:" + port); });
