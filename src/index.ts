import { createServer } from "node:http";
import { createApp, createRouter, eventHandler, toNodeListener } from "h3";

const app = createApp();

const router = createRouter().get("/", eventHandler(() => "Hello world!"));

app.use(router);

createServer(toNodeListener(app)).listen(process.env.PORT || 3000);
