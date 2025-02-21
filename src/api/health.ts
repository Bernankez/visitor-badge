import { createRouter, eventHandler } from "h3";

export function createHealthRoute() {
  const router = createRouter().get("/health", eventHandler(() => {
    return "ok";
  }));

  return router;
}
