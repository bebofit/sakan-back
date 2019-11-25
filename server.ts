import http from 'http';
import { startDB, stopDB } from './database';
import app from './app';

const PORT = process.env.PORT || 3005;
app.set('port', PORT);
const server = http.createServer(app);

function onError(error: any): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${PORT} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${PORT} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

(async function main(): Promise<void> {
  try {
    await startDB();
    server.listen(PORT);
    server.on('error', onError);
    server.on('listening', () => console.log(`started on port ${PORT}`));
    //handle closing of server
    process.on('SIGHUP', stopDB);
    process.on('SIGTERM', stopDB);
    process.on('SIGINT', stopDB);
    process.once('SIGUSR2', stopDB);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
