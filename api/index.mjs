import { createServer } from "node:http";
import process from "node:process";
import consola from "consola";
import { createApp, toNodeListener } from "h3";
import { createAppRoute } from "./api/index.mjs";
import { createHealthRoute } from "./api/health.mjs";
import { connect } from "./database/connect.mjs";
import { Counter, Log } from "./database/schema.mjs";
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
  createServer(toNodeListener(app)).listen(process.env.PORT || 3e3);
}
initWebServer();
