import { createServer } from "node:http";
import { createApp, toNodeListener } from "h3";
import consola from "consola";
import { connect } from "../src/database/connect";
import { Counter, Log } from "../src/database/schema";
import { createRouter } from "../src/api";

async function initWebServer() {
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
