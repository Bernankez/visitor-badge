import { createServer } from "node:http";
import { createApp, createError, createRouter, eventHandler, getHeaders, toNodeListener } from "h3";
import consola from "consola";
import { connect } from "./database/connect";
import { Counter, Log } from "./database/schema";
import { increment } from "./database/service";

const app = createApp();

const mongodb = await connect();

mongodb.connection.on("disconnected", () => {
  consola.info("mongodb disconnected");
});

consola.success("mongodb connected");

await Log.ensureIndexes();
await Counter.ensureIndexes();

consola.success("mongodb indexes ensured");

const router = createRouter().get("/api/**", eventHandler(async (event) => {
  const headers = getHeaders(event);
  const [namespace, key] = event.context.params?._?.split("/") ?? [];
  if (!namespace) {
    throw createError({
      statusCode: 400,
      statusMessage: "namespace is required",
    });
  } else if (!key) {
    throw createError({
      statusCode: 400,
      statusMessage: "key is required",
    });
  }
  return await increment(namespace, key, headers);
}));

app.use(router);

createServer(toNodeListener(app)).listen(process.env.PORT || 3000);
