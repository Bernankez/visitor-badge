import { createServer } from "node:http";
import process from "node:process";
import consola from "consola";
import { createApp, toNodeListener } from "h3";
import { createAppRoute } from "./api";
import { createHealthRoute } from "./api/health";
import { connect } from "./database/connect";
import { Counter, Log } from "./database/schema";

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

  const appRoute = createAppRoute();
  const healthRoute = createHealthRoute();
  app.use(appRoute);
  app.use(healthRoute);

  createServer(toNodeListener(app)).listen(process.env.PORT || 3000);
}

initWebServer();
