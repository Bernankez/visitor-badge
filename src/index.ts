import { createServer } from "node:http";
import { createApp, toNodeListener } from "h3";
import consola from "consola";
import { connect } from "./database/connect";
import { Counter, Log } from "./database/schema";
import { createRouter } from "./api";

async function initWebServer() {
  consola.success("starting web server");
  const app = createApp();

  const mongodb = await connect();

  mongodb.connection.on("disconnected", () => {
    consola.info("mongodb disconnected");
  });

  consola.success("mongodb connected");

  await Log.ensureIndexes();
  await Counter.ensureIndexes();

  consola.success("mongodb indexes ensured");

  const router = createRouter();
  app.use(router);

  createServer(toNodeListener(app)).listen(process.env.PORT || 443);
}

initWebServer();
