import type { H3Event } from "h3";
import { setHeaders } from "h3";

export function handleHeader(event: H3Event) {
  // not to cache images
  setHeaders(event, {
    "Content-Type": "image/svg+xml",
    "Cache-Control": "max-age=0, no-cache, no-store, must-revalidate",
  });
}
