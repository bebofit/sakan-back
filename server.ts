import http from "http";
import { startDB, stopDB } from "./database";
import app from "./app";
import config from "./config";
import socket from "./common/services/socket";

const { PORT } = config;

let server: http.Server;

const listen = (): Promise<void> =>
  new Promise(resolve => server.listen(PORT, resolve));

const unlisten = (): Promise<void> =>
  new Promise((resolve, reject) => {
    server.close((err: Error) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

async function startServer(): Promise<void> {
  await startDB();
  server = http.createServer(app);
  socket.init(server);
  await listen();
  const addr = server.address();
  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${addr.port}`;
  console.log(`Listening on ${bind}`);
}

// function onError(error: any): void {
//   if (error.syscall !== "listen") {
//     throw error;
//   }
//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case "EACCES":
//       console.error(`${PORT} requires elevated privileges`);
//       process.exit(1);
//       break;
//     case "EADDRINUSE":
//       console.error(`${PORT} is already in use`);
//       process.exit(1);
//       break;
//     default:
//       throw error;
//   }
// }

async function closeServer(): Promise<void> {
  await unlisten();
  server = null;
  await stopDB();
}

export { startServer, closeServer };
