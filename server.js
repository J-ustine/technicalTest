import http from "http";
import serveHandler from "serve-handler";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = "localhost";
const port = 3000;

http
  .createServer((req, res) =>
    serveHandler(req, res, {
      public: __dirname,
    })
  )
  .listen(port, hostname, () =>
    console.log(`Server is running on port ${hostname}:${port}`)
  );
