import http from "http";
import serveHandler from "serve-handler";

const hostname = "localhost";
const port = 3000;

http
  .createServer((req, res) =>
    serveHandler(req, res, {
      public: "/Users/Justine/Desktop/CODE/GitHub/WHISBI",
    })
  )
  .listen(port, hostname, () =>
    console.log(`Server is running on port ${hostname}:${port}`)
  );
