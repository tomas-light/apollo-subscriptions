import path from 'path';
import express, { RequestHandler } from 'express';
import http from 'http';
import { json, urlencoded } from 'body-parser';
import { configureApollo } from './config';

const appDir = path.dirname(require.main?.filename || __dirname);
const uiBundlePath = path.join(appDir, '..', '..', 'dist');

const app = express();
app.use(json({ limit: '50mb' }) as RequestHandler);
app.use(urlencoded({ limit: '50mb', extended: true }) as RequestHandler);
app.use(express.static(uiBundlePath));

app.get('/*', (request, response) => {
  const pathToView = path.join(uiBundlePath, `index.html`);
  response.sendFile(pathToView);
});

const httpServer = http.createServer(app);

(async function () {
  const apolloServer = await configureApollo(app, httpServer);

  const host = 'localhost';
  const port = 5000;
  httpServer.listen(port, host, () => {
    console.log(`Server is listen http://${host}:${port}`, `GraphQl 🚀 http://${host}:${port}${apolloServer.graphqlPath}`);
  });
})();
