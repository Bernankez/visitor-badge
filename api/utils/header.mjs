import { setHeaders } from "h3";
export function handleHeader(event) {
  setHeaders(event, {
    "Content-Type": "image/svg+xml",
    "Cache-Control": "max-age=0, no-cache, no-store, must-revalidate"
  });
}
